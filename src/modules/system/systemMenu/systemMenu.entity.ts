import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SystemMenuOperationType } from './systemMenu.enum';
import { Status } from '../../../sw/enums/RecordStatusEnum';

@Entity('system_menu')
export class SystemMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'integer', nullable: true })
  parentId: number;

  @Column({ nullable: true })
  router: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  orderKey: string;

  @Column({ default: false })
  directlyAccess: boolean;

  @Column('enum', {
    enum: SystemMenuOperationType,
    default: SystemMenuOperationType.Read,
  })
  operationType: SystemMenuOperationType;

  @Column('enum',{
    enum: Status,
    default:Status.Enabled,
  })
  status : Status
}
