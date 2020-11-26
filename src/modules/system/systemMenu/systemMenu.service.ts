import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemMenu } from './systemMenu.entity';
import { Repository } from 'typeorm';
import { CreateSystemMenuInputs } from './dto/systemMenuInputs';

@Injectable()
export class SystemMenuService {
  constructor(
    @InjectRepository(SystemMenu)
    private systemMenuRepository: Repository<SystemMenu>,
  ) {}

  //todo you have limit the amount of the record
  async getAllSystemMenus(): Promise<SystemMenu[]> {
    //const rt = await this.systemMenuRepository.find();
    return await this.systemMenuRepository.find({loadRelationIds:true});
  }

  async getSystemMenu(id): Promise<SystemMenu> {
    return await this.systemMenuRepository.findOne({ id },{loadRelationIds:true});
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
    const found = await this.systemMenuRepository.findOne(parentId,{loadRelationIds:true});
    if(!found){
      throw new NotFoundException("ParentId is not exists.")
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
}
