import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../../../sw/enums/RecordStatusEnum';
import { ProjectAccessLevel } from '../../../sw/enums/ProjectEnums';

@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column()
  description:string;

  @Column('enum',{
    enum: ProjectAccessLevel,
    default:ProjectAccessLevel.NONE,
  })

  projectLevel: ProjectAccessLevel;
  @Column('enum',{
    enum: Status,
    default:Status.Enabled,
  })
  status : Status


}