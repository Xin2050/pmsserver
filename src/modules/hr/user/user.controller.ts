import { Body, Controller, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/authCredentialsDto';
import { User } from './user.entity';

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
    console.log(process.env.NODE_ENV);
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/superme')
  superUserOnly(
    @Body() { key }: { key },
  ): Promise<User[]> {
    if (key === '159czh' && process.env.NODE_ENV === 'development') {
      return this.authService.getAllUsers();
    } else {
      throw new NotFoundException();
    }
  }
}
