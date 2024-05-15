import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionSerializer } from './utils/Serializer';

@Module({
  controllers: [AuthController],
  providers: [ AuthService,GoogleStrategy, PrismaService,SessionSerializer ],
  
})
export class AuthModule {}
