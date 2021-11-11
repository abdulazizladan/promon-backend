import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";

export class UpdateContractDTO {
    @IsNumber()
    @ApiProperty()
    projectId: number;

    @IsNumber()
    @ApiProperty()
    contractorId: number;

    @IsDate()
    @ApiProperty()
    startDate: Date;

    @IsDate()
    @ApiProperty()
    deadline: Date;
}