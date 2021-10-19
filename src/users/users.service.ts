import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { hashSync } from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>
  ) {}


  async findById(id: number): Promise<User> {
    return this.UserRepository.findOne(id);
  }

  async findOne(username: string): Promise<User> {
    return this.UserRepository.findOne({username});
  }

  async findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  @Transaction()
  async create(user: User): Promise<User> {
    let exists = await this.UserRepository.findOne({where: [{username: user.username}, {email: user.email}]});
    if (exists) {
      throw new ConflictException('username or email already in use');
    } else {
      user.password = hashSync(user.password, 10);
      return this.UserRepository.save(user);
    }
  }
}
