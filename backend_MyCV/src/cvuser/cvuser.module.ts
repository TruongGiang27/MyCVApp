import { Module } from '@nestjs/common';
import { CvuserService } from './cvuser.service';
import { CvuserController } from './cvuser.controller';

@Module({
  controllers: [CvuserController],
  providers: [CvuserService],
})
export class CvuserModule {}
