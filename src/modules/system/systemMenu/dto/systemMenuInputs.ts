import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsIn,
  IsInt, IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { SystemMenuOperationType } from '../systemMenu.enum';
import { Optional } from '@nestjs/common';
import { Status } from '../../../../sw/enums/RecordStatusEnum';

@InputType()
export class CreateSystemMenuInputs {
  @Field()
  @MinLength(2)
  name: string;

  @Field({ nullable: true })
  @Optional()
  @IsInt()
  parentId: number;

  @Field({ nullable: true })
  @Optional()
  router: string;

  @Field({ nullable: true })
  @Optional()
  icon: string;

  @Field({ nullable: true })
  @Optional()
  @Length(1, 10)
  orderKey: string;

  @Field({ nullable: true })
  @Optional()
  @IsBoolean()
  directlyAccess: boolean;

  @Field({ nullable: true })
  @Optional()
  @IsIn(Object.values(SystemMenuOperationType))
  operationType: SystemMenuOperationType;
}

@InputType()
export class UpdateSystemMenuInputs extends PartialType(
  CreateSystemMenuInputs,
) {}


@InputType()
export class GetSystemMenuFilterInput extends PartialType(
  CreateSystemMenuInputs,
){


  @Field(type=>Int,
    {defaultValue:Status.Enabled})
  @IsIn(Object.values(Status))
  @IsOptional()
  status: Status;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  id: number;

}