import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserDetails(@Query() query: GetUserDto) {
    return this.userService.getUserDetails(query.id);
  }
}
