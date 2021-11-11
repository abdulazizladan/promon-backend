import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe,
  Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse,
  ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthUser, User } from '../auth/user.decorator';
import { ContractorService } from './contractor.service';
import { CreateContractorDTO } from './dto/create-contractor.dto';
import { UpdateContractorDTO } from './dto/update-contractor.dto';

@ApiBearerAuth()
@ApiTags('contractors')
@UseGuards(AuthGuard())
@Controller('contactors')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Get()
  @ApiQuery({name: 'filter', required: false})
  @ApiOkResponse({description: 'successfully retrieve a list of contractor'})
  async list(@Query('filter') filter: string) {
    return this.contractorService.list(filter);
  }

  @Get(':id')
  @ApiNotFoundResponse({description: 'contractor with id not found'})
  @ApiOkResponse({description: 'successfully retrieve a contractor'})
  async retrieve(@Param('id', ParseIntPipe) id: number) {
    const contractor = await this.contractorService.findById(id);
    if (!contractor) throw new NotFoundException();
    return contractor;
  }

  @Post()
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  @ApiCreatedResponse({description: 'successfully created a contractor'})
  async create(@User() user: AuthUser, @Body() dto: CreateContractorDTO) {
      return this.contractorService.create(user.id, dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  @ApiOkResponse({description: 'successfully updated the contractor'})
  async update(@User() user: AuthUser,@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateContractorDTO) {
    return this.contractorService.update(user.id, id, dto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({description: 'contractor with id not found'})
  @ApiNoContentResponse({description: 'successfully deleted a contractor'})
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.contractorService.deleteById(id);
  }
}
