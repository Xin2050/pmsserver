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

@Resolver((of) => SystemMenuTypes)
export class SystemMenuResolver {
  constructor(private systemMenuService: SystemMenuService) {}

  @Query((returns) => [SystemMenuTypes])
  async getAllSystemMenus(): Promise<SystemMenu[]> {
    return await this.systemMenuService.getAllSystemMenus();
  }

  @ResolveField()
  async parent(@Parent() systemMenu: SystemMenu) {
    const { parentId } = systemMenu;
    return await this.systemMenuService.getSystemMenu(parentId);
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
