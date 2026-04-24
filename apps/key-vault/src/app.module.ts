import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '../.env'),
    }),
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt-token' }),
    JwtModule.register({}),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
