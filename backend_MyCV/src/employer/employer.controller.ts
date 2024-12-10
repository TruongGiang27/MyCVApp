import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerService } from './employer.service';

@Controller('employers')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

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

  @Patch(':_id')
  update(@Param('_id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employerService.update(id, updateEmployerDto);
  }

  @Delete(':_id')
  remove(@Param('_id') id: string) {
    return this.employerService.remove(id);
  }

  @Get('employer_id')
  getEmployer(@Query('employer_id') employerId: string) {
    try{
      return this.employerService.checkEmployer(employerId);
    }
    catch(error){
      throw error;
    }
  }

}