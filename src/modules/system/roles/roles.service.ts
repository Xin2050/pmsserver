import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { AssignSystemMenusToRoleInput, CreateRolesInput } from './dto/roles.input';
import { SystemMenu } from '../systemMenu/systemMenu.entity';

@Injectable()
export class RolesService {
    constructor(
      @InjectRepository(Roles)
      private rolesRepository:Repository<Roles>,
      @InjectRepository(SystemMenu)
      private systemMenuRepository:Repository<SystemMenu>,
    ){}

  createRoles(createRolesInput:CreateRolesInput){
      const roles = this.rolesRepository.create(createRolesInput)
      return this.rolesRepository.save(roles);
  }

  async getRole(id:number) {
      return this.rolesRepository.findOne(id);
  }

  getAllRoles() {
      return this.rolesRepository.find();
  }

  async assignSystemMenusToRole(assignSystemMenusToRoleInput:AssignSystemMenusToRoleInput) {
      const {roleId,systemMenuIds} = assignSystemMenusToRoleInput;

      const role = await this.rolesRepository.findOne(roleId);
      if(!role){
        throw new NotFoundException()
      }
      const sysMenus = await this.systemMenuRepository.findByIds(systemMenuIds);
      role.systemMenus = sysMenus;
      return this.rolesRepository.save(role)
  }

}
