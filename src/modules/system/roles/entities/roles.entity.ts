import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../../../../sw/enums/RecordStatusEnum';
import { ProjectAccessLevel } from '../../../../sw/enums/ProjectEnums';
import { SystemMenu } from '../../systemMenu/systemMenu.entity';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column({nullable:true})
  description:string;

  @Column('enum',{
    enum: ProjectAccessLevel,
    default:ProjectAccessLevel.NONE,
  })
  projectLevel: ProjectAccessLevel;

  @Column('integer',{array:true,nullable:true})
  sysCompanies: number[];

  @Column('enum',{
    enum: Status,
    default:Status.Enabled,
  })
  status : Status;

  @ManyToMany(type=>SystemMenu,
      systemMenu=>systemMenu.roles)
  systemMenus: SystemMenu[]
}