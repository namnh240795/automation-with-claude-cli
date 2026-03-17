import { ApiProperty } from '@nestjs/swagger';
import { RealmResponseDto } from './realm-response.dto';
import { PaginationMetaDto } from '../../dto/paginated-response.dto';

export class RealmsPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of realms',
    isArray: true,
    type: RealmResponseDto,
  })
  data: RealmResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
