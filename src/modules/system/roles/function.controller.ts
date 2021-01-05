import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {FunctionService} from "./function.service";
import {CreateFunctionDto, FunctionIdsDto, SearchFunctionDto, UpdateFunctionDto} from "./dto/function.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser, GetUserRelationIds} from "../../hr/user/auth/getUser.decorator";
import {User} from "../../hr/user/user.entity";
import {UserRelationIds} from "../../hr/user/dto/FontUser";


@Controller('system/function')
@UseGuards(AuthGuard())
export class FunctionController {
    constructor(private readonly functionService:FunctionService){}

    @Post('createOne')
    create(@Body() createFunctionDto:CreateFunctionDto){
        return this.functionService.createOne(createFunctionDto);
    }

    @Get('fetchFunctionTree')
    fetchFunctionTree(){
        return this.functionService.fetchFunctionTree();
    }

    @Put('updateFunction/:id')
    updateFunction(
        @Body()updateFunctionDto:UpdateFunctionDto,
        @Param("id",ParseIntPipe) id:number
    ){
        return this.functionService.updateFunction(id,updateFunctionDto)
    }

    @Get('fetchRootMenu')
    fetchRootMenu(@GetUserRelationIds()user:UserRelationIds){
        const roleId = user.role;
        if(roleId) {
            return this.functionService.fetchRootMenu(roleId);
        }else{
            return [];
        }
    }

    @Post('searchForTree')
    searchForTree(@Body()searchFunctionDto:SearchFunctionDto){
        return this.functionService.searchForTree(searchFunctionDto);
    }

    @Get("fetchFunction/:id")
    fetchFunction(@Param("id",ParseIntPipe)id:number){
        return this.functionService.fetchFunction(id);
    }

    @Post("fetchFunctionIdsFromParentIds")
    fetchFunctionIdsFromParentIds (@Body() functionIdsDto:FunctionIdsDto){
        return this.functionService.fetchFunctionIdsFromParentIds(functionIdsDto);
    }

    @Post("fetchFunctions")
    fetchFunctions (@Body() functionIdsDto:FunctionIdsDto){
        return this.functionService.fetchFunctions(functionIdsDto);
    }



}