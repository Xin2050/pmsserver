import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProjectAccessLevel } from '../../../../sw/enums/ProjectEnums';
import { Status } from '../../../../sw/enums/RecordStatusEnum';
import { SysCompanyTypes } from '../../syscompany/entities/syscompany.types';
import { SystemMenu } from '../../systemMenu/systemMenu.entity';
import { SystemMenuTypes } from '../../systemMenu/systemMenu.types';


registerEnumType(ProjectAccessLevel,{name:"ProjectAccessLevel"});

@ObjectType("Roles")
export class RolesTypes {
  @Field(type=>ID)
  id:number;

  @Field()
  name: string;

  @Field({nullable:true})
  description:string;

  @Field(type=>ProjectAccessLevel,
    {defaultValue:ProjectAccessLevel.NONE})
  projectLevel: ProjectAccessLevel;

  @Field(type=>Status,
    {defaultValue:Status.Enabled})
  status : Status;

  @Field(type=>[SysCompanyTypes],
    {nullable:true})
  sysCompanies: number[];

  @Field(type=>[SystemMenuTypes],{nullable:true})
  systemMenus:SystemMenuTypes[];
}