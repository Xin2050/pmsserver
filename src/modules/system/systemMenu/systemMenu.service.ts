import {Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SystemMenu} from './systemMenu.entity';
import {IsNull, Repository} from 'typeorm';
import {CreateSystemMenuInputs, GetSystemMenuFilterInput} from './dto/systemMenuInputs';
import {QueryBuilder} from "../../../sw/querybuilder/queryBuilder";
import { Status } from 'src/sw/enums/RecordStatusEnum';

@Injectable()
export class SystemMenuService {
    private logger = new Logger('SystemMenu');

    constructor(
        @InjectRepository(SystemMenu)
        private systemMenuRepository: Repository<SystemMenu>,
    ) {
    }

    //todo you have limit the amount of the record
    async getAllSystemMenus(): Promise<SystemMenu[]> {
        //const rt = await this.systemMenuRepository.find();
        return await this.systemMenuRepository.find();
    }

    async getSystemMenu(id): Promise<SystemMenu> {
        const found = await this.systemMenuRepository.findOne({relations: ["parent", "child"], where: {id}});
        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async createSystemMenu(
        createSystemMenuInput: CreateSystemMenuInputs,
    ): Promise<SystemMenu> {
        const {
            name,
            parentId,
            router,
            icon,
            orderKey,
            directlyAccess,
            operationType,
        } = createSystemMenuInput;
        const found = await this.systemMenuRepository.findOne(parentId, {loadRelationIds: true});
        if (!found) {
            throw new NotFoundException('ParentId is not exists.');
        }

        const systemMenu = this.systemMenuRepository.create({
            name,
            router,
            parent: found,
            icon,
            orderKey,
            directlyAccess,
            operationType,
        });

        return await this.systemMenuRepository.save(systemMenu);

    }

    // for role use
    async getSystemMenusByIds(ids: number[]): Promise<SystemMenu[]> {
        return await this.systemMenuRepository.findByIds(ids);
    }


    async getSystemMenusByParentId(parentId: number): Promise<SystemMenu[]> {
        const query = this.systemMenuRepository.createQueryBuilder('menu');
        query.where("menu.parentId=:parentId", {parentId})
        return await query.getMany();
    }

    async getRootMenu(userId: number): Promise<SystemMenu[]> {

        return await this.systemMenuRepository.find({
            relations: ["child"],
            where: {parent:IsNull(),status: Status.Enabled },
            order:{orderKey:"ASC"}
        });

    }


    //for getUserSubMenu and Search Function
    async searchSM(getSystemMenuFilterInput: GetSystemMenuFilterInput): Promise<SystemMenu[]> {
        const {
            id, status, operationType, directlyAccess,
            orderKey, icon, router, parentId, name,
        } = getSystemMenuFilterInput;
        console.log(getSystemMenuFilterInput);
        if (id) {
            return [await this.getSystemMenu(id)];
        }
        const query = new QueryBuilder<SystemMenu>(this.systemMenuRepository, "menu");
        if (status === -1) {
            query.addWhere('menu.status > -1');
        } else {
            query.where({status});
        }
        const qb = query.andWhere({operationType, directlyAccess, orderKey, icon, parentId})
            .andLikeWhere({name, router})
            .getQuery()
            .leftJoinAndSelect("menu.parent", "parent")
            .leftJoinAndSelect('menu.child', 'child')


        try {
            return await qb.getMany();
        } catch (e) {
            this.logger.error(`Failed to get Menus for ${getSystemMenuFilterInput}`, e.stack);
            throw new InternalServerErrorException();
        }

    }


}
