import { PartialType } from '@nestjs/swagger';
import { CreateRealmDto } from './create-realm.dto';

export class UpdateRealmDto extends PartialType(CreateRealmDto) {}
