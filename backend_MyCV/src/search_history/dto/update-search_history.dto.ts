import { PartialType } from '@nestjs/mapped-types';
import { CreateSearchHistoryDto } from './create-search_history.dto';

export class UpdateSearchHistoryDto extends PartialType(CreateSearchHistoryDto) {}
