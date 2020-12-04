import {
    Args,
    Int,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import {SystemMenuTypes} from './systemMenu.types';
import {SystemMenuService} from './systemMenu.service';
import {SystemMenu} from './systemMenu.entity';
import {CreateSystemMenuInputs, GetSystemMenuFilterInput, UpdateSystemMenuInputs} from './dto/systemMenuInputs';
import {UseGuards} from '@nestjs/common';
import {GraphQLAuthGuard} from '../../hr/user/auth/auth.guard';
import {GetGQLUserID} from "../../hr/user/auth/getUser.decorator";


@Resolver((of) => SystemMenuTypes)
@UseGuards(GraphQLAuthGuard)
export class SystemMenuResolver {
    constructor(private systemMenuService: SystemMenuService) {
    }

    // @Query((returns) => [SystemMenuTypes])
    // async getAllSystemMenus(): Promise<SystemMenu[]> {
    //     return await this.systemMenuService.getAllSystemMenus();
    // }

    @Query((returns) => SystemMenuTypes)
    async getSystemMenu(@Args("id") id: number): Promise<SystemMenu> {
        return await this.systemMenuService.getSystemMenu(id);
    }

    @Query(rs => [SystemMenuTypes])
    async searchSystemMenu(@Args('searchMenuFilterInput')
                               getSystemMenuFilterInput: GetSystemMenuFilterInput) {

        return await this.systemMenuService.searchSM(getSystemMenuFilterInput);
    }

    //todo update
    // @Mutation((returns) =>SystemMenuTypes)
    // async updateSystemMenu(@Args('updateSystemMenuInput') updateSystemMenuInputs:UpdateSystemMenuInputs) {
    //
    // }
    @Query((returns) => [SystemMenuTypes])
    async getRootMenu(@GetGQLUserID() userid:number){

        return await this.systemMenuService.getRootMenu(userid);
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
