import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import {CreateOrEditRolesDto} from "./dto/role.dto";

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateOrEditRolesDto) {
    return this.rolesService.create(createRoleDto);
  }

}
