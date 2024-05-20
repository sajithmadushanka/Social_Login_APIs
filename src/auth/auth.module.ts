import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionSerializer } from './utils/Serializer';
import { FaceBookStrategy } from './utils/FaceBookStrategy';

@Module({
  controllers: [AuthController],
  providers: [ AuthService,GoogleStrategy, PrismaService,SessionSerializer,FaceBookStrategy ],
  
})
export class AuthModule {}
