import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateContractDTO {
    @IsNotEmpty()
    @ApiProperty()
    projectId: string;

    @IsNumber()
    @ApiProperty()
    contractorId: number;

    @IsDateString()
    @ApiProperty()
    startDate: Date;

    @IsDateString()
    @ApiProperty()
    endDate: Date;
}