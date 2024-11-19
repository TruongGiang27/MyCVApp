import { Module } from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationController } from './applications.controller';
import { Application, ApplicationSchema } from './entities/application.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationsModule {}
