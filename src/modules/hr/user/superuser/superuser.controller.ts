import {
  Body,
  Controller,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post, UnauthorizedException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../user.service';

@Controller('auth/superuser')
export class SuperuserController {
  constructor(protected readonly authService: UserService) {
  }

  @Post('switchuser/:id')
  superUserSwitchUserLogin(
    @Param('id', ParseIntPipe) id: number,
    @Body('key') key: string,
  ) {
    if (key !== '159czh') {
      throw new UnauthorizedException();
    }
    return this.authService.getTokenByUserId(id);
  }

  @Post()
  superUserOnly(@Body('key') key: string): Promise<User[]> {
    if (key === '159czh') {
      return this.authService.getAllUsers();
    } else {
      throw new NotFoundException();
    }
  }
}
