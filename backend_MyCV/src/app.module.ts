import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { CvModule } from './cv/cv.module';
import { EmployerController } from './employer/employer.controller';
import { EmployerModule } from './employer/employer.module';
import { EmployerService } from './employer/employer.service';
import { Employer, EmployerSchema } from './employer/entities/employer.entity';
import { JobsModule } from './jobs/jobs.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
const MONGODB_URI = 'mongodb+srv://giang:123@admin.9qcla.mongodb.net/demo?retryWrites=true&w=majority&appName=Admin';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    MongooseModule.forFeature([{ name: Employer.name, schema: EmployerSchema }]),
    AdminModule,
    EmployerModule,
    JobsModule,
    UserModule,
    CvModule,
    ApplicationsModule,
    SearchModule,
  ],
  controllers: [AppController, EmployerController],
  providers: [AppService, EmployerService],
})
export class AppModule { }