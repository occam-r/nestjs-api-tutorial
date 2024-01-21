import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async addUserPrefrances(
    userId: number,
    name: string,
    color: string,
  ) {
    const user =
      await this.prisma.preference.upsert({
        where: {
          userId,
        },
        update: {
          color,
          name,
        },
        create: {
          userId,
          name,
          color,
        },
      });

    return user;
  }
}
