import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/hr/user/user.module';


//start import from submodules' index
import SystemModules from './modules/system/';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, //this is must be import for auth. other function can disabled for test speed.
    ...SystemModules,
  ],
})
export class AppModule {}
