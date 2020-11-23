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

@Entity('SystemMenu')
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
}
