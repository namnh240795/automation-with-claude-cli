import { Module } from '@nestjs/common';
import { OrganizationInvitationsController } from './organization-invitations.controller';
import { UserOrganizationModule } from '../user-organization/user-organization.module';

@Module({
  imports: [UserOrganizationModule],
  controllers: [OrganizationInvitationsController],
})
export class OrganizationInvitationsModule {}