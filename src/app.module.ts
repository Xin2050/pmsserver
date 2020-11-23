import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/hr/user/user.module';
import { RecipeModule } from './modules/exp/recipe/recipe.module';


//start import from submodules' index
import SystemModules from './modules/system/';
import { TypeGraphQLModule } from 'typegraphql-nestjs';


@Module({
  imports: [
    TypeGraphQLModule.forRoot({
      emitSchemaFile: true,
      installSubscriptionHandlers: true,
      dateScalarMode: 'timestamp',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, //this is must be import for auth. other function can disabled for test speed.
    ...SystemModules,
    //blow are experiment modules
    RecipeModule,
  ],
})
export class AppModule {}
