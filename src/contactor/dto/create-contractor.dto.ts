import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ContactDTO } from './contact.dto';
import { ContractorDTO } from './contractor.dto';
import { UserDTO } from './user.dto';

export class CreateContractorDTO {
  @ValidateNested()
  @Type(() => ContractorDTO)
  @ApiProperty({type: ContractorDTO})
  contractor: ContractorDTO;

  @ValidateNested()
  @Type(() => UserDTO)
  @ApiProperty({type: UserDTO})
  user: UserDTO;
}