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
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([Contractor])
  ]
})
export class ContactorModule {}
