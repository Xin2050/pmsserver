import { Field, InputType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { SystemMenuOperationType } from '../systemMenu.enum';

@InputType()
export class CreateSystemMenuInputs {
  @Field()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @ValidateIf(o => o.parentId)
  @IsInt()
  parentId: number;

  @Field({ nullable: true })
  @ValidateIf(o => o.router)
  router: string;

  @Field({ nullable: true })
  @ValidateIf(o => o.icon)
  icon: string;

  @Field({ nullable: true })
  @ValidateIf(o => o.orderKey)
  @Length(1, 10)
  orderKey: string;

  @Field({ nullable: true })
  @ValidateIf(o => o.directlyAccess)
  @IsBoolean()
  directlyAccess: boolean;

  @Field({ nullable: true })
  @ValidateIf(o => o.operationType)
  @IsIn(Object.values(SystemMenuOperationType))
  operationType: SystemMenuOperationType;
}

@InputType()
export class UpdateSystemMenuInputs extends PartialType(
  CreateSystemMenuInputs,
) {}
