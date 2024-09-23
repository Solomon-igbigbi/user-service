import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/create-auth.dto';
import { CustomFieldValidationPipe } from '../shared/validations/custom';
import { Public } from '../shared/middleware/auth/auth.middleware';
import { ApiBody } from '@nestjs/swagger';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto, description: 'Register new user' })
  @Public()
  @Post('register')
  create(@Body(CustomFieldValidationPipe) data: CreateUserDto) {
    return this.authService.create(data);
  }

  @ApiBody({ type: LoginDto, description: 'Login user' })
  @Public()
  @Post('login')
  login(@Body(CustomFieldValidationPipe) data: LoginDto) {
    return this.authService.login(data);
  }
}
