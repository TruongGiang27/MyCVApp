import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerService } from './employer.service';

@Controller('employers')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) { }
  
  @Get()
  async findAllOrSearch(
    @Query('companyName') companyName?: string,
    @Query('fullName') fullName?: string,
    @Query('howDidYouHear') howDidYouHear?: string,
    @Query('phoneNumber') phoneNumber?: string,
  ) {
    const filters = {
      ...(companyName && { companyName: new RegExp(companyName, 'i') }),
      ...(fullName && { fullName: new RegExp(fullName, 'i') }),
      ...(howDidYouHear && { howDidYouHear: new RegExp(howDidYouHear, 'i') }),
      ...(phoneNumber && { phoneNumber: new RegExp(phoneNumber, 'i') }),
    };
    return this.employerService.findByFilters(filters);
  }

  @Patch(':_id/block')
  async blockEmployer(@Param('_id') id: string) {
    return this.employerService.updateAdmin(id, { isBlocked: true });
  }

  @Patch(':_id/unblock')
  async unblockEmployer(@Param('_id') id: string) {
    return this.employerService.updateAdmin(id, { isBlocked: false });
  }
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