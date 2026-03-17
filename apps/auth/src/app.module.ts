import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RealmsModule } from './realms/realms.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { ClientsModule } from './clients/clients.module';
import { SessionsModule } from './sessions/sessions.module';
import { RequiredActionsModule } from './required-actions/required-actions.module';
import { EventsModule } from './events/events.module';
import { AuthenticationModule } from './authentication-flows/authentication-flows.module';
import { IdentityProvidersModule } from './identity-providers/identity-providers.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '../.env'),
    }),
    PrismaModule,
    AuthModule,
    RealmsModule,
    UsersModule,
    RolesModule,
    GroupsModule,
    ClientsModule,
    SessionsModule,
    RequiredActionsModule,
    EventsModule,
    AuthenticationModule,
    IdentityProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
