import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { JwtPayload } from './auth/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private logger = new Logger('User Service');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }

  async signUpUserForTest(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const uid = await this.userRepository.createUserForTest(authCredentialsDto);
    return await this.createToken(uid);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const uid = await this.userRepository.signIn(authCredentialsDto);
    if (!uid) {
      throw new UnauthorizedException('Invalid authorization');
    }
    const token = await this.createToken(uid);
    this.logger.debug(`Generated JWT payload ${JSON.stringify({ uid })}`);
    return { token };
  }

  async getTokenByUserId(id: number): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    const token = await this.createToken(user.uid);
    this.logger.log(`Super User Login in by using User:${user.id}-${user.cName}'s token`);
    return { token };
  }

  createToken(uid: string): Promise<string> {
    const payload: JwtPayload = { uid };
    return this.jwtService.signAsync(payload);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
