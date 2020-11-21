import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import * as config from 'config';
import { JwtPayload, ValidatedToken } from './jwt-payload.interface';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';

const moment = require('moment');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<ValidatedToken> {
    const { uid, exp } = payload;
    const validatedToken: ValidatedToken = { token: '', user: null };

    const user = await this.userRepository.findOne({ uid });
    if (!user) {
      throw new UnauthorizedException();
    }
    validatedToken.user = user;
    if (moment().isAfter(moment.unix(exp))) {
      validatedToken.token = await this.createToken(uid);
    }
    return validatedToken;
  }

  createToken(uid: string): Promise<string> {
    const payload: JwtPayload = { uid };
    return this.jwtService.signAsync(payload);
  }
}
