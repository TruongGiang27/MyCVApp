import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerService } from './employer.service';

@Controller('employers')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) { }

  @Post()
  create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.create(createEmployerDto);
  }

  @Get()
  findAll() {
    return this.employerService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') id: string) {
    return this.employerService.findOne(id);
  }

  @Put(':userId')
  update(@Param('userId') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employerService.update(id, updateEmployerDto);
  }

  @Delete(':_id')
  remove(@Param('_id') id: string) {
    return this.employerService.remove(id);
  }

  @Get('check-cv-employer/:userId')
  async checkCvEmployer(@Param('userId') userId: string) {
    const hasCv = await this.employerService.hasCvEmployer(userId);
    return { hasCv };
  }


}