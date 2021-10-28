import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Contact } from '../type/contact.type';
import { ContactDTO } from './contact.dto';

export class CreateContractorDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  rcNumber: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({isArray: true, type: ContactDTO})
  contacts: ContactDTO[];
}