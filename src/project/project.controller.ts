import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, 
    ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthUser, User } from 'src/auth/user.decorator';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './value/create-project.dto';

@ApiBearerAuth()
@ApiTags('Projects')
@UseGuards(AuthGuard())
@Controller('projects')
export class ProjectController {

    constructor(private readonly projectService: ProjectService) {
    }

    @Get()
    @ApiQuery({name: 'title', required: false})
    @ApiOkResponse({description: 'successfully retrieve a list of projects'})
    async list(@Query('title') title: string) {
        return this.projectService.list(title);
    }

    @Get(':id')
    @ApiNotFoundResponse({description: 'project with id not found'})
    @ApiOkResponse({description: 'successfully retrieve a project'})
    async retrieve(@Param('id') id: string) {
        const project = await this.projectService.findById(id);
        if (!project) throw new NotFoundException();
        else return project;
    }

    @Post()
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    @ApiCreatedResponse({description: 'successfully created a project'})
    async create(@User() user: AuthUser, @Body() dto: CreateProjectDTO) {
        return this.projectService.create(user.id, dto);
    }

    @Delete(':id')
    @ApiNotFoundResponse({description: 'project with id not found'})
    @ApiNoContentResponse({description: 'successfully deleted a project'})
    async delete(@Param('id') id: string) {
        await this.projectService.deleteById(id);
    }
}
