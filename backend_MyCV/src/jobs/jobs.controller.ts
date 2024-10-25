import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createJobDto: CreateJobDto) {
    return this.jobsService.update(id, createJobDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobsService.delete(id);
  }
}
