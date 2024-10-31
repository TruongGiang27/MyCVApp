import { PartialType } from '@nestjs/mapped-types';
import { CreateCvuserDto } from './create-cvuser.dto';

export class UpdateCvuserDto extends PartialType(CreateCvuserDto) {}
