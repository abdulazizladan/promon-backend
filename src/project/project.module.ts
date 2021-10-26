import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/Project';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/user.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    TypeOrmModule.forFeature([Project]),
    AuthModule,
    UsersModule
  ]
})
export class ProjectModule {}
