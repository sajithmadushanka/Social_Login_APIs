// prisma.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async user() {
    return this.prisma.user;
  }

  async createUser(data: any) {
    return this.prisma.user.create({ data });
  }

  async findUniqueUser(data: any) {
    return this.prisma.user.findUnique({ where: data });
  }
}
