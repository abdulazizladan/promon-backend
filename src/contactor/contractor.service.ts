import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ILike, Repository } from 'typeorm';
import { CreateContractorDTO } from './dto/create-contractor.dto';
import { UpdateContractorDTO } from './dto/update.contracor.dto';
import { Contractor } from './entity/contractor.entity';

@Injectable()
export class ContractorService {
  constructor(
    @InjectRepository(Contractor) private readonly contractorRepository: Repository<Contractor>,
    private readonly userService: UserService 
  ) {}

  async list(filter: string): Promise<Contractor[]> {
    if (filter) {
      const likeFilter = ILike(`%${filter}%`);
      this.contractorRepository.find({where: [{name: likeFilter}, {rcNumber: likeFilter}]});
    } else {
      return this.contractorRepository.find();
    }
  }

  async create(userId: number, dto: CreateContractorDTO): Promise<Contractor> {
    const user = await this.userService.findById(userId);
    if (await this.contractorRepository.count({rcNumber: dto.rcNumber}))
      throw new ConflictException('rc number already registered');
    return this.contractorRepository.save({...dto, createdBy: user});
  }

  async findById(id: number): Promise<Contractor> {
    const contractor = await this.contractorRepository.findOne(id);
    if (!contractor) throw new NotFoundException();
    return contractor;
  }

  async update(userId: number, id: number, dto: UpdateContractorDTO): Promise<Contractor> {
    const contractor = await this.findById(id);
    if (!contractor) throw new NotFoundException();

    const user = await this.userService.findById(id);
    this.contractorRepository.update(id, {...dto, lastUpdatedBy: user});
    return Object.assign(contractor, dto);
  }

  async deleteById(id: number) {
    const contractor = await this.findById(id);
    if (!contractor) throw new NotFoundException();
    await this.contractorRepository.remove(contractor);
  }
}
