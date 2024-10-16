import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerService } from './employer.service';
import { Employer, EmployerSchema } from './entities/employer.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employer.name, schema: EmployerSchema }])
  ],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}