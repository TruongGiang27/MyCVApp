import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'search-history' }) // Đặt tên collection là "search-history"
export class SearchHistory extends Document {
  @Prop()
  title: string;

  @Prop()
  location: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const SearchHistorySchema = SchemaFactory.createForClass(SearchHistory);
