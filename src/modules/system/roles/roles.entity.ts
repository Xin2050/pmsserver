import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../../../sw/enums/RecordStatusEnum';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column('enum',{
    enum: Status,
    default:Status.Enabled,
  })
  status : Status
}