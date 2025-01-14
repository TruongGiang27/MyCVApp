import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  //Search
  @Get('search')
  async search(
    @Query('query') query?: string,
    @Query('location') location?: string
  ) {
    console.log('Search query:', query);
    console.log('Location:', location);
    return this.jobsService.search(query, location);
  }

  @Get('suggest')
  async suggestJobsOrCompanies(@Query('q') query: string) {
    return this.jobsService.suggestJobsOrCompanies(query);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Get('job-of-user/:userId')
  async getJobByUserId(@Param('userId') userId: string) {
    return this.jobsService.getJobByUserId(userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobsService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: Partial<CreateJobDto>) {
  const job = await this.jobsService.findOne(id);
  if (!job) {
    return {
      statusCode: 404,
      message: 'Công việc không tồn tại.',
    };
  }
  // Kiểm tra nếu trạng thái là "Đã đóng" và công việc có ứng viên
  if (updateJobDto.status === "Đã Đóng") {
    const hasApplicants = await this.jobsService.checkApplicantsForJob(id);
    if (hasApplicants) {
      return {
        statusCode: 400,
        message: 'Không thể đóng công việc. Công việc hiện có ứng viên nộp CV.',
      };
    }
  }

  return this.jobsService.update(id, updateJobDto);
}

}
