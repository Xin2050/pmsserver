import { Module } from '@nestjs/common';

import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { UserModule } from '../../hr/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysCompanyModule } from '../syscompany/syscompany.module';
import { Roles } from './entities/roles.entity';
import { SystemMenuModule } from '../systemMenu/systemMenu.module';
import { SystemMenu } from '../systemMenu/systemMenu.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Roles,SystemMenu]),
    SysCompanyModule,
    SystemMenuModule,
  ],
  providers: [RolesResolver, RolesService],
  exports: [RolesService]
})
export class RolesModule {}
