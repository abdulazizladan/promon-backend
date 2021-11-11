import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Contractor } from '../../contactor/entity/contractor.entity';
import { Project } from '..//../project/entity/Project.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn({name: 'id'})
  id?: number;

  @ManyToOne(type => Project)
  @JoinColumn({name: 'project_id'})
  project: Project;

  @ManyToOne(type => Contractor)
  @JoinColumn({name: 'contractor_id'})
  contractor: Contractor;

  @Column({name: 'start_date'})
  startDate: Date;

  @Column({name: 'end_date'})
  endDate: Date;
  
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