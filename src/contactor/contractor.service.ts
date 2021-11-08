import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scope } from '../user/type/scope.type';
import { UserService } from 'src/user/user.service';
import { ILike, Repository } from 'typeorm';
import { CreateContractorDTO } from './dto/create-contractor.dto';
import { UpdateContractorDTO } from './dto/update.contracor.dto';
import { Contractor } from './entity/contractor.entity';
import { User } from '../user/entity/user.entity';
import { Contact } from './type/contact.type';

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
    const createdBy = await this.userService.findById(userId);
    const contact: Contact = {firstName: dto.user.firstName, lastName: dto.user.lastName, 
      email: dto.user.lastName, phone: [dto.user.phone]};

    const user: User = await this.userService.save({...dto.user, createdBy: 
      createdBy.id, scope: Scope.CONTRACTOR});

    Logger.log(dto.contractor.website);
    if (await this.contractorRepository.count({rcNumber: dto.contractor.rcNumber}))
      throw new ConflictException('rc number already registered');
    return this.contractorRepository.save({...dto.contractor, contacts: [contact], createdBy, user});
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
