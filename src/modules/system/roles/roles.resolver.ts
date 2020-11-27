import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RolesTypes } from './entities/roles.types';
import { RolesService } from './roles.service';
import { CreateRolesInput } from './dto/roles.input';
import { SysCompanyService } from '../syscompany/syscompany.service';


@Resolver(of=>RolesTypes)
export class RolesResolver {
  constructor(
    private rolesService:RolesService,
    private sysCompanyService:SysCompanyService,
  ){}

  @Query(returns=>RolesTypes)
  async getRole(@Args('id') id:number):Promise<RolesTypes>{
    return await this.rolesService.getRole(id);
  }

  @Query(returns=>[RolesTypes])
  async getAllRole():Promise<RolesTypes[]> {
    return await this.rolesService.getAllRoles();
  }

  @Mutation(returns=>RolesTypes)
  async createRole(@Args('createRoleInput') createRolesInput:CreateRolesInput){

    return await this.rolesService.createRoles(createRolesInput);

  }

  @ResolveField()
  async sysCompanies(@Parent() rolesTypes:RolesTypes){
    const {sysCompanies} = rolesTypes;
    if(!sysCompanies){
      return null;
    }
    return await this.sysCompanyService.findCompanies(sysCompanies)
  }


}
