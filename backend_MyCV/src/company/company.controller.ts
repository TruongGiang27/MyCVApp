import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }
  @Get(':userId/:jobId')
  findJobByUserIdAndJobId(@Param('userId') userId: string, @Param('jobId') jobId: string) {
    return this.companyService.findJobByUserIdAndJobId(userId, jobId);
  }
// homeEmployer là đường dẫn để lấy ra danh sách công ty theo userId
  @Get('/homeEmployer')
  async getCompanies(@Query('userId') userId: string) {
    try {
      if (!userId) {
        return { message: 'userId is required' };
      }

      const data = await this.companyService.getCompaniesByUser(userId);
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}