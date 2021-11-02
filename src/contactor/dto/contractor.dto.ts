import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { ContactDTO } from "./contact.dto";

export class ContractorDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  rcNumber: string;

  @ApiProperty()
  website: string;
}