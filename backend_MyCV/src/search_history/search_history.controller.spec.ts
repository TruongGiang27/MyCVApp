import { Test, TestingModule } from '@nestjs/testing';
import { SearchHistoryController } from './search_history.controller';
import { SearchHistoryService } from './search_history.service';

describe('SearchHistoryController', () => {
  let controller: SearchHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchHistoryController],
      providers: [SearchHistoryService],
    }).compile();

    controller = module.get<SearchHistoryController>(SearchHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
