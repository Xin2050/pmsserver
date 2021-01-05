import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {FunctionController} from "./function.controller";
import {FunctionService} from "./function.service";
import {UserModule} from "../../hr/user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Function} from "./entities/function.entity";
import {Role} from "./entities/role.entity";

@Module({
  imports:[
      UserModule,
      TypeOrmModule.forFeature([Function,Role])
  ],
  controllers: [RolesController,FunctionController],
  providers: [RolesService,FunctionService]
})
export class RolesModule {}
