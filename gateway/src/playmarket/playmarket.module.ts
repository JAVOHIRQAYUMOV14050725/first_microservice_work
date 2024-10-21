import { Module } from '@nestjs/common';
import { PlaymarketController } from './playmarket.controller';

@Module({
  controllers: [PlaymarketController],
  providers: [],
})
export class PlaymarketModule {}
