import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Role {
    @PrimaryColumn()
    name: string;

    @ManyToMany(type => Permission)
    @JoinTable({name: 'role-permission'})
    permissions: Permission[];

    @Column({name: 'created_at', default: Date.now})
    createdAt: Date
}