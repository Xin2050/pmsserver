import {BeforeInsert, Column, Entity, Generated, ManyToOne, Unique,} from 'typeorm';

import * as bcrypt from 'bcrypt';
import {EntityBaseTemplate} from "src/sw/template/entity/entity.template";
import {Role} from "../../system/roles/entities/role.entity";
import {SysCompany} from "../../system/syscompany/entities/syscompany.entity";

const faker = require('faker');

@Entity()
@Unique('emailkey', ['email'])
@Unique('uidKey', ['uid'])
export class User extends EntityBaseTemplate {

  @Column()
  @Generated('uuid')
  uid: string;

  @Column()
  email: string;


  @Column({select:false})
  password: string;

  @Column({ nullable: true })
  cName: string;

  @Column({ nullable: true })
  eName: string;

  //relations
  @ManyToOne(type=>Role,role=>role.users)
  role: Role;

  @ManyToOne(type=>SysCompany, company=>company.users)
  company: SysCompany;

  @BeforeInsert()
  beforeInsert() {
    this.cName = faker.name.firstName();
    this.eName = faker.name.firstName();
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
