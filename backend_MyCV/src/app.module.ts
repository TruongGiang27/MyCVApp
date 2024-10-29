import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './userService/user.controller';
import { UserService } from './userService/user.service';
import { AdminModule } from './admin/admin.module';
import { EmployerController } from './employer/employer.controller';
import { EmployerModule } from './employer/employer.module';
import { EmployerService } from './employer/employer.service';
import { Employer, EmployerSchema } from './employer/entities/employer.entity';
import { User, UserSchema } from './userService/entity/user.entity';
import { JobsModule } from './jobs/jobs.module';
import { SearchHistoryModule } from './search_history/search_history.module';
import { JobDetailModule } from './job-detail/job-detail.module';

const MONGODB_URI = 'mongodb+srv://giang:123@admin.9qcla.mongodb.net/demo?retryWrites=true&w=majority&appName=Admin';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
    { name: Employer.name, schema: EmployerSchema }]),

    EmployerModule,
    AdminModule,
    JobsModule,
    SearchHistoryModule,
    JobDetailModule,
    // UserModule,
  ],
  controllers: [AppController, UsersController, EmployerController],
  providers: [AppService, UserService, EmployerService],
})
export class AppModule { }