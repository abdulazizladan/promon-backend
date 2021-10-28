import { User } from '../../user/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Contact } from '../type/contact.type';

@Entity()
export class Contractor {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @Column({name: 'rc_number', nullable: false, unique: true})
  rcNumber: string;

  @Column({name: 'contacts', type: 'jsonb', array: true})
  contacts: Contact[];

  @CreateDateColumn({name: 'created_at'})
  createdAt?: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;

  @ManyToOne(type => User, {nullable: false})
  @JoinColumn({name: 'created_by'})
  createdBy: User;

  @ManyToOne(type => User)
  @JoinColumn({name: 'last_updated_by'})
  lastUpdatedBy?: User;
}