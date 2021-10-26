import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

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

    @ApiProperty({required: false})
    stage?: string;

    @ApiProperty({required: false})
    lga?: string;
}