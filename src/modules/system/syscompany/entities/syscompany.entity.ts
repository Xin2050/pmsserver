import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, } from 'typeorm';
import { decimal } from '../../../../utils/Number';
import {EntityBaseTemplate} from "src/sw/template/entity/entity.template";


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

  totalTaxRate: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  protected setTotalTaxRate(){
    this.totalTaxRate =  decimal(this.vatRate * this.localTaxRate,4);
  }


}
