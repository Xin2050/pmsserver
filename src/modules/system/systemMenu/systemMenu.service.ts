import { Injectable } from '@nestjs/common';
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
    return await this.systemMenuRepository.find();
  }

  async getSystemMenu(id): Promise<SystemMenu> {
    return await this.systemMenuRepository.findOne({ id });
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
    const systemMenu = this.systemMenuRepository.create({
      name,
      parentId,
      router,
      icon,
      orderKey,
      directlyAccess,
      operationType,
    });
    return await this.systemMenuRepository.save(systemMenu);
  }
}
