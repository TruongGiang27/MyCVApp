import { PartialType } from '@nestjs/mapped-types';
import { CreateJobpostDto } from './create-jobpost.dto';

export class UpdateJobpostDto extends PartialType(CreateJobpostDto) {}
