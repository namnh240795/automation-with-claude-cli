import { ApiProperty } from '@nestjs/swagger';
import { RoleResponseDto } from './role-response.dto';
import { PaginationMetaDto } from '../../dto/paginated-response.dto';

export class RolesPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of roles',
    isArray: true,
    type: RoleResponseDto,
  })
  data: RoleResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
