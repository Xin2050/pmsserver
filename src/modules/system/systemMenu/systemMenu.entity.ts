import {
  Column,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SystemMenuOperationType } from './systemMenu.enum';
import { Status } from '../../../sw/enums/RecordStatusEnum';
import { Roles } from '../roles/entities/roles.entity';

@Entity('system_menu')
export class SystemMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @ManyToOne(type=>SystemMenu, systemMenu => systemMenu.child)
  @JoinColumn({name:'parentId'})
  parent: SystemMenu;

  @OneToMany(type=>SystemMenu,systemMenu=>systemMenu.parent)
  child:SystemMenu[];

  @ManyToMany(type=>Roles,roles=>roles.systemMenus)
  @JoinTable({
    name:"systemMenu_roles"
  })
  roles: Roles[];
}
