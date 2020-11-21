import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUserForTest(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt(10);
    const user = new User();
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    try {
      const newUser = await user.save();
      return newUser.uid;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
    const found = await this.findOne({ email });
    if (!found) {
      return null;
    }
    if (await found.comparePassword(password)) {
      return found.uid;
    }
    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
