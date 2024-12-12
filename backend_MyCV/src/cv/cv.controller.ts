import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';

@Controller('cv_form')
export class CvController {
  constructor(private readonly cvService: CvService) { }

  @Post()
  async createCv(@Body() createCvDto: any): Promise<Cv> {
    console.log('Received Data:', createCvDto);
    return this.cvService.createCv(createCvDto);
  }

  @Put(':id')
  async updateCv(@Param('id') id: string, @Body() updateCvDto: any): Promise<Cv> {
    return this.cvService.updateCv(id, updateCvDto);
  }

  @Get(':id')
  async getCv(@Param('id') id: string): Promise<Cv> {
    return this.cvService.getCv(id);
  }

  @Get('/user/:userId')
  async getCvByUserId(@Param('userId') userId: string): Promise<Cv[]> {
    return this.cvService.getCvByUserId(userId);
  }

  @Get()
  async getAllCvs(): Promise<Cv[]> {
    return this.cvService.getAllCvs();
  }

  @Delete('/deletecv/:cvId')
  async deleteCv(@Param('cvId') cvId: string): Promise<Cv> {
    return this.cvService.deleteCv(cvId);
  }
}
