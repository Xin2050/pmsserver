import { Module } from '@nestjs/common';

import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { UserModule } from '../../hr/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysCompanyModule } from '../syscompany/syscompany.module';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [
    UserModule,
    SysCompanyModule,
    TypeOrmModule.forFeature([Roles]),
  ],
  providers: [RolesResolver, RolesService]
})
export class RolesModule {}
