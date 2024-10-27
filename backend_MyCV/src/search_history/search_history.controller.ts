import { Controller, Get, Post, Body } from '@nestjs/common';
import { SearchHistoryService } from './search_history.service';

@Controller('search-history')
export class SearchHistoryController {
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Post()
  async addSearchHistory(@Body('title') title: string, @Body('location') location: string) {
    return this.searchHistoryService.addSearchHistory(title, location);
  }

  @Get()
  async getSearchHistory() {
    return this.searchHistoryService.getSearchHistory();
  }
}
