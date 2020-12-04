import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { SystemMenuOperationType } from './systemMenu.enum';
import { Status } from '../../../sw/enums/RecordStatusEnum';

registerEnumType(SystemMenuOperationType, { name: 'SystemMenuOperationType' });
registerEnumType(Status,{name: 'Status'});

@ObjectType('SystemMenu')
export class SystemMenuTypes {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;

  // @Field({ nullable: true })
  // parentId: number;

  @Field((type) => SystemMenuTypes, { nullable: true })
  parent: SystemMenuTypes;

  @Field((type)=>[SystemMenuTypes],{nullable:true})
  child: SystemMenuTypes[];

  @Field({ nullable: true })
  router: string;

  @Field({ nullable: true })
  icon: string;

  @Field({ nullable: true })
  orderKey: string;

  @Field({ defaultValue: false })
  directlyAccess: boolean;

  @Field((type) => SystemMenuOperationType, {
    defaultValue: SystemMenuOperationType.Read,
  })
  operationType: SystemMenuOperationType;

  @Field(type => Status, { defaultValue:Status.Enabled })
  status: Status;
}
