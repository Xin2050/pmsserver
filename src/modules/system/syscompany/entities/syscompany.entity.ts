import {AfterInsert, AfterLoad, AfterUpdate, Column, Entity, OneToMany,} from 'typeorm';
import { decimal } from '../../../../utils/Number';
import {EntityBaseTemplate} from "src/sw/template/entity/entity.template";
import {User} from "../../../hr/user/user.entity";
import {Role} from "../../roles/entities/role.entity";


@Entity("sys_company")
export class SysCompany extends EntityBaseTemplate{

  @Column()
  fullName: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  phone: string;

  @Column({type:'decimal',precision:2,scale:2,default:0.06})
  vatRate:number;

  @Column({type:'decimal',precision:3,scale:2,default:1.10})
  localTaxRate:number;

  //relations
  @OneToMany(type=>User,user=>user.company)
  users:User[];

  @OneToMany(type=>Role, role=>role.company)
  roles:Role[]

  totalTaxRate: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  protected setTotalTaxRate(){
    this.totalTaxRate =  decimal(this.vatRate * this.localTaxRate,4);
  }


}
