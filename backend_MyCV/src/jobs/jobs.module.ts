import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from '../jobs/entities/job.entity';
import { Application, ApplicationSchema } from 'src/applications/entities/application.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }, { name: Application.name, schema: ApplicationSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
