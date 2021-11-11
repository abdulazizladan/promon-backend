import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ContactDTO } from './contact.dto';

export class UpdateContractorDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  rcNumber: string;

  @IsOptional()
  @ApiProperty({required: false})
  website?: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty({isArray: true, type: ContactDTO})
  contacts: ContactDTO[];
}