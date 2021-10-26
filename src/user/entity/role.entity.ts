import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Role {
    @PrimaryColumn()
    name: string;

    @ManyToMany(type => Permission)
    @JoinTable({name: 'role-permission'})
    permissions: Permission[];

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}