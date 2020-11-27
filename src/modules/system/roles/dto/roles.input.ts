import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, MinLength, ValidateIf } from 'class-validator';
import { ProjectAccessLevel } from '../../../../sw/enums/ProjectEnums';
import { Type } from 'class-transformer';

@InputType()
export class CreateRolesInput {
  @Field()
  @MinLength(5)
  name: string;

  @Field({nullable:true})
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(Object.values(ProjectAccessLevel))
  projectLevel: ProjectAccessLevel;

  @Field(type=>[ID],{nullable:true})
  @IsOptional()
  @IsArray()
  @Type(()=>Number)
  @IsInt({each:true})
  sysCompanies: number[]

}

@InputType()
export class AssignSystemMenusToRoleInput {
  @Field(type=>ID)
  @Type(()=>Number)
  @IsInt()
  roleId:number;

  @Field(type=>[ID])
  @IsArray()
  @Type(()=>Number)
  @IsInt({each:true})
  systemMenuIds:number[]
}