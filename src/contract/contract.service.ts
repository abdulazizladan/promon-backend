import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateContractDTO } from './dto/create-contract.dto';
import { UpdateContractDTO } from './dto/update-contract.dto';
import { Contract } from './entity/contract.entity';
import { ContractorService } from 'src/contactor/contractor.service';
import { ContractView } from './entity/view/contact.view';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
    private readonly userService: UserService,
    private readonly contractorService: ContractorService,
    private readonly projectService: ProjectService
  ) {}

  async list(projectId: string, contractorId: number): Promise<ContractView[]> {
    // TODO: Add filters
    return this.contractRepository.manager.find(ContractView);
  }

  async create(userId: number, dto: CreateContractDTO): Promise<Contract> {
    const user = await this.userService.findById(userId);
    const project = await this.projectService.findById(dto.projectId);
    const contractor = await this.contractorService.findById(dto.contractorId);

    return this.contractRepository.save({...dto, project, contractor, createdBy: user});
  }

  async findById(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOne({id})
    if (!contract) throw new NotFoundException();
    return contract;
  }

  async update(userId: number, id: number, dto: UpdateContractDTO) {
    const contract = await this.findById(id);
    const user = await this.userService.findById(userId);
    this.contractRepository.update(id, {...dto, lastUpdatedBy: user});
    return Object.assign(contract, dto);
  }

  async deleteById(id: number) {
    const contract = await this.findById(id);
    await this.contractRepository.remove(contract);
  }
}
