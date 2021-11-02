import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
  
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone?: string
}