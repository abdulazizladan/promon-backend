import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { ILike, Repository } from 'typeorm';
import { Project } from './entity/Project';
import { CreateProjectDTO } from './value/create-project.dto';
import { UpdateProjectDTO } from './value/update-project.dto';

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        private readonly userService: UserService
    ) {}

    async list(title: string): Promise<Project[]> {
        if (title)
            return this.projectRepository.find({title: ILike(`%${title}%`)});
        else
            return this.projectRepository.find();
    }

    async create(userId: number, dto: CreateProjectDTO): Promise<Project> {
        const user: User = await this.userService.findById(userId);
        return this.projectRepository.save({...dto, createdBy: user});
    }

    async findById(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({id: id});
        
        if (!project) throw new NotFoundException();
        return project;
    }

    async update(userId: number, id: string, dto: UpdateProjectDTO): Promise<Project> {
        const project = await this.findById(id);
        const user = await this.userService.findById(userId);

        if (!project) throw new NotFoundException();
        return await this.projectRepository.save({...project, ...dto, lastUpdatedBy: user});
    }

    async deleteById(id: string) {
        const project = await this.findById(id);
        
        if (!project) throw new NotFoundException();
        await this.projectRepository.remove(project);
    }
}
