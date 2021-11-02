import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, 
  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Scope } from "../type/scope.type";
import { Role } from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn({name: 'id'})
  id?: number;

  @Column({name: 'first_name', nullable: false})
  firstName: string;

  @Column({name: 'last_name', nullable: false})
  lastName: string;

  @Column({name: 'username', nullable: false, unique: true})
  username: string;

  @Column({name: 'email', nullable: false})
  email: string;

  @Exclude()
  @Column({name: 'password', nullable: false})
  password: string;

  @Column({name: 'phone', nullable: true})
  phone?: string;

  @Column({name: 'is_blocked', default: false})
  isBlocked?: boolean;

  @Column({name: 'reset_password', default: false})
  resetPassword?: boolean;

  @Column({name: 'scope', nullable: false})
  scope: Scope;

  @ManyToOne(type => Role)
  @JoinColumn({name: 'role_name'})
  role?: Role

  @CreateDateColumn({name: 'created_at'})
  createdAt?: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;

  @Column({name: 'created_by'})
  createdBy?: number;

  @Column({name: 'last_updated_by'})
  lastUpdatedBy?: number;
}