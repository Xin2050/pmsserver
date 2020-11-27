import { Module } from '@nestjs/common';

import { UserModule } from '../../hr/user/user.module';
import { SystemMenuResolver } from './systemMenu.resolver';
import { SystemMenuService } from './systemMenu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemMenu } from './systemMenu.entity';
import { RolesModule } from '../roles/roles.module';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([SystemMenu]),
  ],
  providers: [SystemMenuResolver, SystemMenuService],
  exports: [SystemMenuService]
})
export class SystemMenuModule {}
