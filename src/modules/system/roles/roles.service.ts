import { Injectable } from '@nestjs/common';
import {CreateOrEditRolesDto} from "./dto/role.dto";



@Injectable()
export class RolesService {
  create(createRoleDto: CreateOrEditRolesDto) {
    return 'This action adds a new role';
  }


}
