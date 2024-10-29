import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchHistory } from './entities/search_history.entity';

@Injectable()
export class SearchHistoryService {
  constructor(@InjectModel('SearchHistory') private readonly searchHistoryModel: Model<SearchHistory>) {}

  async addSearchHistory(title: string, location: string): Promise<SearchHistory> {
    // Kiểm tra số lượng lịch sử tìm kiếm hiện tại
    const historyCount = await this.searchHistoryModel.countDocuments().exec();
    
    // Nếu có hơn 4 mục, xóa mục cũ nhất (tức mục có `date` nhỏ nhất)
    if (historyCount >= 5) {
      await this.searchHistoryModel.findOneAndDelete({}, { sort: { date: 1 } }).exec();
    }

    // Thêm mục lịch sử mới
    const newHistory = new this.searchHistoryModel({ title, location });
    return newHistory.save();
  }

  async getSearchHistory(): Promise<SearchHistory[]> {
    return this.searchHistoryModel.find().limit(2).sort({ date: -1 }).exec();
  }
}
