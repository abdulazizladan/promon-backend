import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { User } from './entity/user.entity';
import { UserDTO } from 'src/contactor/dto/user.dto';

@Injectable()
export class UserService {

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

  async create(userId: number, user: UserDTO): Promise<User> {
    let exists = await this.UserRepository.findOne({where: {username: user.username}});
    if (exists) {
      throw new ConflictException('username or email already in use');
    } else {
      user.password = this.hashPassword(user.password);
      return this.UserRepository.save({...user, createdBy: userId});
    }
  }

  async save(user: User): Promise<User> {
    let exists = await this.UserRepository.findOne({where: {username: user.username}});
    if (exists) {
      throw new ConflictException('username or email already in use');
    } else {
      user.password = this.hashPassword(user.password);
      return this.UserRepository.save(user);
    }
  }

  hashPassword(password: string): string {
    return hashSync(password, 10);
  }
}
