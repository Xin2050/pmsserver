import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserTypes {
  @Field((type) => ID)
  id: number;

  @Field()
  uid: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  cName: string;

  @Field()
  eName: string;
}
