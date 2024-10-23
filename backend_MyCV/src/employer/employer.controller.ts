import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

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
}