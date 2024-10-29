import { Module } from '@nestjs/common';
import { SearchHistoryService } from './search_history.service';
import { SearchHistoryController } from './search_history.controller';
import { SearchHistorySchema } from './entities/search_history.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SearchHistory', schema: SearchHistorySchema }]),
  ],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService],
  exports: [SearchHistoryService],
})
export class SearchHistoryModule {}
