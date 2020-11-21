import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/hr/user/user.module';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    //   installSubscriptionHandlers: true,
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
  ],
})
export class AppModule {}
