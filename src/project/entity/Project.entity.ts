import { User } from '../../user/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, 
    PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn({name: 'id'})
  id: string;

  @Column({name: 'title', nullable: false})
  title: string;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'beneficiary', nullable: false})
  beneficiary: string;

  @Column({name: 'budget', default: 0})
  budget?: number;

  @Column({name: 'state'})
  state?: string

  @Column({name: 'lga'})
  lga?: string;

  @Column({name: 'street_address'})
  streetAddress?: string;

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