import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(new ValidationPipe({transform: true}))
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req, @Body() login: LoginDTO) {
    return this.authService.login(req.user);
  }
}
