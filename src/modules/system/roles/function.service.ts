import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
    NotFoundException
} from "@nestjs/common";
import {CreateFunctionDto, FunctionIdsDto, SearchFunctionDto, UpdateFunctionDto} from "./dto/function.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {getManager, In, IsNull, Like, Repository} from "typeorm";
import {Function} from './entities/function.entity';
const _ = require('lodash');

@Injectable()
export class FunctionService {

    constructor(
        @InjectRepository(Function) private functionRepository:Repository<Function>,
    ){}

    async createOne (createFunctionDto: CreateFunctionDto) {
        const {parent} = createFunctionDto;
        let found = null;
        if (parent) {
            found = await this.functionRepository.findOne(parent);
            if (!found) {
                throw new NotAcceptableException("ParentId not found");
            }
        }
        try {
            const newFunction = this.functionRepository.create({
                ...createFunctionDto,
                parent:found,
            });

            return await newFunction.save();
        } catch (e) {
            throw new ConflictException("Save Function failed, Maybe a Duplicate entry from name and router");
        }
    }

    async fetchFunctionTree() {
        const manager = getManager();
        const tree =  await manager.getTreeRepository(Function).findTrees();
        const removeMethod = (child)=>{
            return !child.isActive
        }
        this.__removeFromTree(tree,removeMethod);
        return tree;
    }

    __removeFromTree(tree: Function[], method: (child:Function) => {}) {
        _.remove(tree,method);
        for(let node of tree){
            if(node.child.length>0){
                this.__removeFromTree(node.child,method);
            }
        }
    }

    async updateFunction(id: number, updateFunctionDto: UpdateFunctionDto) {
        const found = await this.functionRepository.findOne(id);
        if (!found) {
            throw new NotFoundException("Id not Found");
        }
        //check new parent is equals to any children id.
        let ids = await this.__getAllChildrenId(id)
        ids = ids.flat()
        if (ids.indexOf(updateFunctionDto.parent) > -1) {
            throw new NotAcceptableException("You can't set your parent Function to your child function")
        }
        for (let key of Object.keys(updateFunctionDto)) {
            found[key] = updateFunctionDto[key]
        }
        try {
            return await found.save();
        } catch (e) {
            throw new NotAcceptableException(e.message)
        }
    }
    async __getAllChildrenId(id) {
        const ids = [];
        const root = await this.functionRepository.findOne(
            {
                where: {id},
                relations: ["child"]
            }
        );
        if (root && root.child.length > 0) {
            for (let nextChild of root.child) {
                ids.push(nextChild.id)
                ids.push(await this.__getAllChildrenId(nextChild.id))
            }
        }
        return ids;
    }


    async fetchRootMenu(roleId:number) {

        const functionList = await this.functionRepository
            .createQueryBuilder("function")
            .leftJoin("function.roles","role")
            .leftJoinAndSelect("function.child","child")
            .leftJoin("child.roles","childRole")
            .where("role.id = :roleId",{roleId})
            .andWhere("childRole.id = :roleId",{roleId})
            .andWhere("function.parent is null")
            .andWhere("function.isActive = 1")
            .addOrderBy("function.orderKey","ASC")
            .getMany();
        return {
            menu: this.__makeSystemMenu(functionList),
        }

    }
    __makeSystemMenu(functionList: Function[]) {
        return functionList.map(rootMenu => {
            if (Array.isArray(rootMenu.child)) {
                return {
                    subheader: rootMenu.name,
                    items: rootMenu.child.map(secondLevelMenu => {
                        return {
                            title: secondLevelMenu.name,
                            icon: secondLevelMenu.icon,
                            href: secondLevelMenu.router,
                        }
                    })
                }
            }

        });

    }

    async searchForTree(searchFunctionDto: SearchFunctionDto) {
        const {search, parent} = searchFunctionDto;

        const searchOptions: any = {
            relations: ["child"],
            order: {orderKey: "ASC"},
            where: {},
        }
        if (parent) { // click a node
            searchOptions.where = {parent}
        } else if (search) { //search from input

            if (!isNaN(Number(search))) { //search for a id
                searchOptions.where = {
                    id: search
                }
            } else { //search for name or router
                searchOptions.where = [
                    {name: Like(`%${search}%`)},
                    {router: Like(`%${search}%`)}
                ]
                delete searchOptions.relations;
            }
        } else { //init root
            searchOptions.where = {parent: IsNull()}
        }
        try {
            return await this.functionRepository.find(searchOptions);
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }
    async fetchFunction(id:number) {
        try {
            const found = await this.functionRepository.findOne(
                {
                    where: {id},
                    relations: ["parent"]
                }
            );
            if(found){
                return found;
            }else{
                throw new NotFoundException();
            }
        } catch (e) {
            throw new InternalServerErrorException();
        }

    }


    async fetchFunctionIdsFromParentIds(parentIdsDto:FunctionIdsDto):Promise<number[]>{
        const {ids} = parentIdsDto;
        const manager = getManager();
        const functions:Function[] = await this.functionRepository.find({where: {id: In(ids)}})
        const rsFunctions = new Set<number>();
        for(let aFunction of functions){
            const subFunctions = await manager.getTreeRepository(Function).findDescendants(aFunction);
            subFunctions.forEach(fun=>rsFunctions.add(fun.id))
        }
        return Array.from(rsFunctions);
    }

    async fetchFunctions(functionIdsDto: FunctionIdsDto) {
        const {ids} = functionIdsDto;
        return await this.functionRepository.find({where: {id: In(ids)}})
    }
}