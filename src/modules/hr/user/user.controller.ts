import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, GetUserID, GetValidatedToken } from './auth/getUser.decorator';
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
  authCheck(@GetValidatedToken() vtk: ValidatedToken, @GetUserID() id: number) {
    return vtk;
  }

  @Post('/superme')
  superUserOnly(@Body() { key }: { key }): Promise<User[]> {
    if (key === '159czh' && process.env.NODE_ENV === 'development') {
      return this.authService.getAllUsers();
    } else {
      throw new NotFoundException();
    }
  }
}
