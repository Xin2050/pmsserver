import { Field, ID, ObjectType } from 'type-graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Recipe {

  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @CreateDateColumn()
  @Field()
  creationDate: Date;

  @Column('varchar', { array: true, nullable: true })
  @Field(type => [String])
  ingredients: string[];
}