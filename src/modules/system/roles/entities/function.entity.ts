import {
    Column,
    Entity,
    JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany, Tree, TreeChildren, TreeParent, Unique,
} from 'typeorm';


import { Role } from './role.entity';
import {EntityBaseTemplate} from "../../../../sw/template/entity/entity.template";


export enum FunctionOperationType {
    Read = 'r',
    Write = 'w',
    Delete = 'd',
}


@Entity("function")
@Unique("InANodeOnlyHaveOneUniqueName",["name","router"])
@Tree('closure-table')
export class Function  extends EntityBaseTemplate {

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
        enum: FunctionOperationType,
        default: FunctionOperationType.Read,
    })
    operationType: string;

    @TreeParent()
    parent: Function;

    @TreeChildren()
    child:Function[];

    @ManyToMany(type=>Role,role=>role.functions)
    @JoinTable({
        name:"function_roles"
    })
    roles: Role[];
}