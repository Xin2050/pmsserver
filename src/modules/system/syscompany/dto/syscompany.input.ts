import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional, MinLength, ValidateIf } from 'class-validator';

@InputType()
export class CreateSysCompanyInput {
  @Field()
  @MinLength(5)
  name:string;

  @Field()
  @MinLength(5)
  fullName: string;


  @Field({ nullable: true })
  @IsOptional()
  @MinLength(5)
  description: string;

  @Field({ nullable: true })
  phone: string;

  @Field()
  vatRate: number;

  @Field()
  localTaxRate: number;
}

export class UpdateSysCompanyInput extends PartialType(CreateSysCompanyInput){
  @Field()
  @IsInt()
  id:number;


}
