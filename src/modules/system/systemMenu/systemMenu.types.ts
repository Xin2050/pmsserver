import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { SystemMenuOperationType } from './systemMenu.enum';

registerEnumType(SystemMenuOperationType, { name: 'SystemMenuOperationType' });

@ObjectType('SystemMenu')
export class SystemMenuTypes {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  parentId: number;

  @Field((type) => SystemMenuTypes, { nullable: true })
  parent: SystemMenuTypes;

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
}
