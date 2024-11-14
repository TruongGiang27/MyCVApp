// src/application/application.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() applicationData: Partial<Application>): Promise<Application> {
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() applicationData: Partial<Application>): Promise<Application> {
    return await this.applicationService.updateApplication(id, applicationData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return await this.applicationService.deleteApplication(id);
  }
}
