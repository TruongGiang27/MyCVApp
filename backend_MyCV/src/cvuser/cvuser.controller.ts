import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvuserService } from './cvuser.service';
import { CreateCvuserDto } from './dto/create-cvuser.dto';
import { UpdateCvuserDto } from './dto/update-cvuser.dto';

@Controller('cvuser')
export class CvuserController {
  constructor(private readonly cvuserService: CvuserService) {}

  @Post()
  create(@Body() createCvuserDto: CreateCvuserDto) {
    return this.cvuserService.create(createCvuserDto);
  }

  @Get()
  findAll() {
    return this.cvuserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvuserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvuserDto: UpdateCvuserDto) {
    return this.cvuserService.update(+id, updateCvuserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvuserService.remove(+id);
  }
}
