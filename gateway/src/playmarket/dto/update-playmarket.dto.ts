import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaymarketDto } from './create-playmarket.dto';

export class UpdatePlaymarketDto extends PartialType(CreatePlaymarketDto) {}
