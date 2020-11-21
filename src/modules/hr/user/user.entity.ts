import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

const faker = require('faker');

@Entity()
@Unique('emailkey', ['email'])
@Unique('uidKey', ['uid'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  cName: string;

  @Column({ nullable: true })
  eName: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.cName = faker.name.firstName();
    this.eName = faker.name.firstName();
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
