import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { decimal } from '../../../../utils/Number';
import { Status } from '../../../../sw/enums/RecordStatusEnum';


@Entity("sys_company")
export class SysCompany {

  @PrimaryGeneratedColumn()
  id: number;

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

  @Column('enum',{
    enum: Status,
    default:Status.Enabled,
  })
  status : Status;

  totalTaxRate: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  protected setTotalTaxRate(){
    this.totalTaxRate =  decimal(this.vatRate * this.localTaxRate,4);
  }



}
