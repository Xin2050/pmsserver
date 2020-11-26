import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SystemMenuTypes } from './systemMenu.types';
import { SystemMenuService } from './systemMenu.service';
import { SystemMenu } from './systemMenu.entity';
import { CreateSystemMenuInputs } from './dto/systemMenuInputs';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from '../../hr/user/auth/auth.guard';



@Resolver((of) => SystemMenuTypes)
//@UseGuards(GraphQLAuthGuard)
export class SystemMenuResolver {
  constructor(private systemMenuService: SystemMenuService) {}

  @Query((returns) => [SystemMenuTypes])
  async getAllSystemMenus(): Promise<SystemMenu[]> {
    return await this.systemMenuService.getAllSystemMenus();
  }

  @Query((returns) => SystemMenuTypes)
  async getSystemMenu(@Args("id") id:number):Promise<SystemMenu>{
    return await this.systemMenuService.getSystemMenu(id);
  }

  @ResolveField()
  async parent(@Parent() systemMenu: SystemMenu) {
    const { parent } = systemMenu;
    return await this.systemMenuService.getSystemMenu(parent);
  }

  @Mutation((returns) => SystemMenuTypes)
  async createSystemMenu(
    @Args('cSMI') createSystemMenuInputs: CreateSystemMenuInputs,
  ) {
    return await this.systemMenuService.createSystemMenu(
      createSystemMenuInputs,
    );
  }
}
