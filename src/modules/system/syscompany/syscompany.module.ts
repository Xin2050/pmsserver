import { Module } from '@nestjs/common';
import { SysCompanyService } from './syscompany.service';
import { SysCompanyResolver } from './syscompany.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysCompany } from './entities/syscompany.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysCompany])],
  providers: [SysCompanyResolver, SysCompanyService],
  exports: [SysCompanyService]
  
})
export class SysCompanyModule {}
