import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany} from "typeorm";

import {Function} from './function.entity'
import {EntityBaseTemplate} from "../../../../sw/template/entity/entity.template";
import {SysCompany} from "../../syscompany/entities/syscompany.entity";
import {User} from "../../../hr/user/user.entity";


@Entity('role')
export class Role extends EntityBaseTemplate{

    @Column()
    name:string;

    @Column({nullable:true})
    description:string;

    @ManyToOne(type => SysCompany,
            company => company.roles)
    @JoinColumn({name:'companyId'})
    company: SysCompany

    @OneToMany(type=>User,user=>user.role)
    users:User[]

    @ManyToMany(type=>Function,
        systemMenu=>systemMenu.roles)
    functions: Function[]
}