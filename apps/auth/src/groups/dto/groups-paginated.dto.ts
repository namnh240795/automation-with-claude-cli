import { ApiProperty } from '@nestjs/swagger';
import { GroupResponseDto } from './group-response.dto';
import { PaginationMetaDto } from '../../dto/paginated-response.dto';

export class GroupsPaginatedResponseDto {
  @ApiProperty({
    description: 'Array of groups',
    isArray: true,
    type: GroupResponseDto,
  })
  data: GroupResponseDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;
}
