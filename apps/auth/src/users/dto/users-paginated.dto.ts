import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';
import { PaginationMetaDto } from '../../dto/paginated-response.dto';

export class UsersPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of users',
    isArray: true,
    type: UserResponseDto,
  })
  data: UserResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
