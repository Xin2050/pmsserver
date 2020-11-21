import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { AuthGuard } from '@nestjs/passport';
import { GetValidatedToken } from './auth/getUser.decorator';
import { ValidatedToken } from './auth/jwt-payload.interface';

@Controller('auth')
export class UserController {
  constructor(protected readonly authService: UserService) {
  }

  //todo this method for Developer use only ,
  // it should remove when add User method function has finished
  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    return this.authService.signUpUserForTest(authCredentialsDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/authCheck')
  @UseGuards(AuthGuard())
  authCheck(@GetValidatedToken() vtk: ValidatedToken) {
    return vtk;
  }


}
