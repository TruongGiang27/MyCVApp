import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  async createCv(@Body() createCvDto: any): Promise<Cv> {
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
}
