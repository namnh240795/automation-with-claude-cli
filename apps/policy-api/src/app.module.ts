import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PoliciesModule } from './policies/policies.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PoliciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
