import { User } from '../user.entity';

export interface JwtPayload {
  uid: string;
  exp?: number;
}

export interface ValidatedToken {
  token: string;
  user: User;
}

