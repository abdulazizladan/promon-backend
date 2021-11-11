import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { identity } from 'rxjs';
import { AuthUser, User } from '../auth/user.decorator';
import { ContractService } from './contract.service';
import { CreateContractDTO } from './dto/create-contract.dto';
import { UpdateContractDTO } from './dto/update-contract.dto';

@ApiBearerAuth()
@ApiTags('contracts')
@UseGuards(AuthGuard())
@Controller('contracts')
export class ContractController {

  constructor(private readonly contractService: ContractService) {}

  @Get()
  @ApiQuery({name: 'projectId', required: false})
  @ApiQuery({name: 'contractorId', required: false})
  @ApiOkResponse({description: 'successfully retrieve a list of contract'})
  async list(@Query('projectId') projectId: string, @Query('contractorId') contractorId: number) {
    return this.contractService.list(projectId, contractorId);
  }

  @Get(':id')
  @ApiNotFoundResponse({description: 'contract with id not found'})
  @ApiOkResponse({description: 'successfully retrieve a contract'})
  async retrieve(@Param('id', ParseIntPipe) id: number) {
    const contract = await this.contractService.findById(id);
    if (!contract) throw new NotFoundException();
    return contract;
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async create(@User() user: AuthUser, @Body() dto: CreateContractDTO) {
    return this.contractService.create(user.id, dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  @ApiOkResponse({description: 'successfully updated the contract'})
  async update(@User() user: AuthUser, @Param('id', ParseIntPipe) id: number,  @Body() dto: UpdateContractDTO) {
    return this.contractService.update(user.id, id, dto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({description: 'contract with id not found'})
  @ApiNoContentResponse({description: 'successfully deleted a contract'})
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.contractService.deleteById(id);
  }
}
