import { Injectable } from '@nestjs/common';
import { CreateSysCompanyInput,UpdateSysCompanyInput } from './dto/syscompany.input';
import { InjectRepository } from '@nestjs/typeorm';
import { SysCompany } from './entities/syscompany.entity';
import { Repository } from 'typeorm';



@Injectable()
export class SysCompanyService {
  constructor(
    @InjectRepository(SysCompany)
    private sysCompanyRepository:Repository<SysCompany>
  ){}

  create(createSysCompanyInput: CreateSysCompanyInput):Promise<SysCompany> {
    const syscompany = this.sysCompanyRepository.create(createSysCompanyInput)
    return this.sysCompanyRepository.save(syscompany);
  }

  findAll() {
    return this.sysCompanyRepository.find();
  }

  findOne(id: number) {
    return this.sysCompanyRepository.findOne(id)
  }

  update(id: number, updateSysCompanyInput: UpdateSysCompanyInput) {
    return `This action updates a #${id} syscompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} syscompany`;
  }
}
