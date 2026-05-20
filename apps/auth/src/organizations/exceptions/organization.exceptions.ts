import { NotFoundException, ConflictException } from '@nestjs/common';

export class OrganizationNotFoundException extends NotFoundException {
  constructor(organizationId: string) {
    super(`Organization with ID '${organizationId}' not found`);
  }
}

export class OrganizationDisplayIdExistsException extends ConflictException {
  constructor(displayId: string) {
    super(`Organization with display ID '${displayId}' already exists`);
  }
}