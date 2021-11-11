import { Module } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { ContractorController } from './contractor.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contractor } from './entity/contractor.entity';

@Module({
  providers: [ContractorService],
  controllers: [ContractorController],
  exports: [ContractorService],
  imports: [
    TypeOrmModule.forFeature([Contractor]),
    UserModule,
    AuthModule
  ]
})
export class ContractorModule {}
