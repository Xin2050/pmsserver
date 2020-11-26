import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { SysCompanyService } from './syscompany.service';
import { SysCompanyTypes } from './entities/syscompany.types';
import { CreateSysCompanyInput, UpdateSysCompanyInput } from './dto/syscompany.input';
import { SysCompany } from './entities/syscompany.entity';



@Resolver((of) => SysCompanyTypes)
export class SysCompanyResolver {
  constructor(private readonly sysCompanyService: SysCompanyService) {}

  @Mutation((returns) => SysCompanyTypes)
  async createSysCompany(@Args('createSysCompanyInput')
                     createSysCompanyInput: CreateSysCompanyInput):Promise<SysCompany> {

    const company =  await this.sysCompanyService.create(createSysCompanyInput);
    console.log(company.totalTaxRate);
    return company;

  }


  @Query((returns) => [SysCompanyTypes])
  getAllSysCompanies() {
    return this.sysCompanyService.findAll();
  }

  @Query((returns) => SysCompanyTypes)
  getSysCompany(@Args('id', { type: () => Int }) id: number) {
    return this.sysCompanyService.findOne(id);
  }


  @Mutation((returns) => SysCompanyTypes)
  removeSyscompany(@Args('id', { type: () => Int }) id: number) {
    return this.sysCompanyService.remove(id);
  }
}
