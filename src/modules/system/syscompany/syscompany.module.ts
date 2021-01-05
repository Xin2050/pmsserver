import { Module } from '@nestjs/common';
import { SysCompanyService } from './syscompany.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysCompany } from './entities/syscompany.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysCompany])],
  providers: [SysCompanyService],
  exports: [SysCompanyService]
  
})
export class SysCompanyModule {}
