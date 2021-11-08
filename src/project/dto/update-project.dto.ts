import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateProjectDTO {

  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  beneficiary: string;

  @ApiProperty({required: false})
  budget?: number;

  @IsOptional()
  @ApiProperty({required: false})
  state?: string;

  @IsOptional()
  @ApiProperty({required: false})
  lga?: string;

  @IsOptional()
  @ApiProperty({required: false})
  streetAddress?: string;
}