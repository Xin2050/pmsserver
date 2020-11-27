import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, MinLength, ValidateIf } from 'class-validator';
import { ProjectAccessLevel } from '../../../../sw/enums/ProjectEnums';

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
  sysCompanies: number[]

}