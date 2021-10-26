import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @ApiProperty({example: 'admin'})
    username: string;

    @IsNotEmpty()
    @ApiProperty({example: 'admin'})
    password: string;
}