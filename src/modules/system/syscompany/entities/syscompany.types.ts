import { Field, ID, ObjectType } from '@nestjs/graphql';


@ObjectType('SysCompany')
export class SysCompanyTypes {
  @Field(type => ID)
  id: number;

  @Field()
  fullName: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  phone: string;

  @Field()
  vatRate: number;

  @Field()
  localTaxRate: number;

  @Field()
  totalTaxRate: number;
}
