import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}
