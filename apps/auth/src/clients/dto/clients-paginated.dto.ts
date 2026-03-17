import { ApiProperty } from '@nestjs/swagger';
import { ClientResponseDto } from './client-response.dto';
import { PaginationMetaDto } from '../../dto/paginated-response.dto';

export class ClientsPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of clients',
    isArray: true,
    type: ClientResponseDto,
  })
  data: ClientResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
