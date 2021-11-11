import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ContractorModule } from '../contactor/contractor.module';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from './entity/contract.entity';
import { ContractView } from './entity/view/contact.view';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports: [
    TypeOrmModule.forFeature([Contract, ContractView]),
    ProjectModule,
    ContractorModule,
    AuthModule,
    UserModule,
  ]
})
export class ContractModule {}
