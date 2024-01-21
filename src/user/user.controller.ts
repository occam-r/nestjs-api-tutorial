import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  editUser(
    @Param('id') userId: string,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(
      Number(userId),
      dto,
    );
  }

  @Get(':id/prefrance')
  setPrefrance(
    @Param('id') userId: string,
    @Query() query: any,
  ) {
    const { name, color } = query;
    return this.userService.addUserPrefrances(
      Number(userId),
      name,
      color,
    );
  }
}
