import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateRolesInput } from './dto/roles.input';

@Injectable()
export class RolesService {
    constructor(
      @InjectRepository(Roles)
      private rolesRepository:Repository<Roles>,
    ){}

  createRoles(createRolesInput:CreateRolesInput){
      const roles = this.rolesRepository.create(createRolesInput)
      return this.rolesRepository.save(roles);
  }

  getRole(id:number) {
      return this.rolesRepository.findOne(id);
  }

  getAllRoles() {
      return this.rolesRepository.find();
  }

}
