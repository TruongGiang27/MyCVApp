// src/application/application.controller.ts
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @Post()
  async create(@Body() applicationData: Partial<Application>): Promise<Application> {
    console.log('applicationData', applicationData);
    return await this.applicationService.createApplication(applicationData);
  }

  @Get()
  async findAll(): Promise<Application[]> {
    return await this.applicationService.getAllApplications();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Application> {
    return await this.applicationService.getApplicationById(id);
  }

  @Get('/job/:jobId')
  async getApplicationsByJobId(@Param('jobId') jobId: string): Promise<Application[]> {
    if (!jobId) throw new NotFoundException('Job ID is required');
    console.log('jobId', jobId);
    return await this.applicationService.getApplicationsByJobId(jobId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() applicationData: Partial<Application>): Promise<Application> {
    return await this.applicationService.updateApplication(id, applicationData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return await this.applicationService.deleteApplication(id);
  }

  @Put(':cvId/decline/:jobId')
  async declineCv(@Param('cvId') cvId: string, @Param('jobId') jobId: string, @Body() status: string): Promise<Application> {
    console.log('cvId', cvId);
    console.log('jobId', jobId);
    console.log('status', status);
    // return null;
    return this.applicationService.declineCv(cvId, jobId, status);
  }

  @Get('/user/:userId')
  async getApplicationsByUserId(@Param('userId') userId: string): Promise<Application[]> {
    if (!userId) throw new NotFoundException('User Id is required');
    console.log('userId', userId);
    return await this.applicationService.getApplicationsByUserId(userId);
  }
}
