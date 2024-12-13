import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { query } from 'express';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  //Search
  @Get('search')
  async search(
    @Query('query') query?: string,
    @Query('location') location?: string
  ) {
    console.log('Search query:', query);
    console.log('Location:', location);
    return this.jobsService.search(query, location);
  }

  @Get('suggest')
  async suggestJobsOrCompanies(@Query('q') query: string) {
    return this.jobsService.suggestJobsOrCompanies(query);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get('job-of-user/:userId')
  async getJobByUserId(@Param('userId') userId: string) {
    return this.jobsService.getJobByUserId(userId);
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
