import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './userService/user.controller';
import { UserService } from './userService/user.service';
import { User, UserSchema } from './userService/schemas/user.schema';
// import { UserModule } from './user/user.module';
import { EmployerModule } from './employer/employer.module';
import { AdminModule } from './admin/admin.module';

const MONGODB_URI = 'mongodb+srv://giang:123@admin.9qcla.mongodb.net/demo?retryWrites=true&w=majority&appName=Admin';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmployerModule,
    AdminModule,
    // UserModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UserService],
})
export class AppModule {}