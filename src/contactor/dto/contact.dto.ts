import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Contact } from "../type/contact.type";

export class ContactDTO implements Contact {
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    website: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string[];
}