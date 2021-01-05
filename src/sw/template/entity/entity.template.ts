import {BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class EntityBaseTemplate extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: true})
    isActive: boolean;

    @Column({default: false})
    isDelete: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date
}