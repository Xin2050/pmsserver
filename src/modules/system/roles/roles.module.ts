import { Module } from '@nestjs/common';

import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { UserModule } from '../../hr/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemMenu } from '../systemMenu/systemMenu.entity';

@Module({
  imports: [
    UserModule,
    //TypeOrmModule.forFeature([SystemMenu]),
  ],
  providers: [RolesResolver, RolesService]
})
export class RolesModule {}
