import { ApiProperty } from "@nestjs/swagger";
import { IsEmail , IsNotEmpty } from "class-validator";

export class RegisterDTO {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}