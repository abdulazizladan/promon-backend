import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { Role } from './entity/role.entity';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([Permission, Role, User])
  ]
})
export class UsersModule {}
