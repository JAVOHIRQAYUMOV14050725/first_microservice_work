import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('playmarket')
export class PlaymarketController {
  constructor(@Inject('USER_MICRO')
  private clientPlayMarketService: ClientProxy
  ) { }


  @Get()
  findAll() {
    return "hello microservice"
  }

}