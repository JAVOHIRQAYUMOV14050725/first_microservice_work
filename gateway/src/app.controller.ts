import { Body, Controller, Get, Inject, Param, Post, Patch, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_MICRO') private clientUserService: ClientProxy,
    @Inject('PRODUCT_MICRO') private clientProductService: ClientProxy,
    private appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // User CRUD operations
  @Get('user')
  getUsers(): Observable<any> {
    return this.clientUserService.send({ cmd: 'get_user' }, {});
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): Observable<any> {
    return this.clientUserService.send({ cmd: 'find_user' }, { id });
  }

  @Post('user')
  createUser(@Body() createUser: any): Observable<any> {
    return this.clientUserService.send({ cmd: 'create_user' }, createUser);
  }

  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() updateUser: any): Observable<any> {
    return this.clientUserService.send({ cmd: 'update_user' }, { id, ...updateUser });
  }

  @Delete('user/:id')
  removeUser(@Param('id') id: string): Observable<any> {
    return this.clientUserService.send({ cmd: 'remove_user' }, { id });
  }

  // Product CRUD operations
  @Get('product')
  getProducts(): Observable<any> {
    return this.clientProductService.send({ cmd: 'get_product' }, {});
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string): Observable<any> {
    return this.clientProductService.send({ cmd: 'find_product' }, { id });
  }

  @Post('product')
  createProduct(@Body() createProduct: any): Observable<any> {
    return this.clientProductService.send({ cmd: 'create_product' }, createProduct);
  }

  @Patch('product/:id')
  updateProduct(@Param('id') id: string, @Body() updateProduct: any): Observable<any> {
    return this.clientProductService.send({ cmd: 'update_product' }, { id, ...updateProduct });
  }

  @Delete('product/:id')
  removeProduct(@Param('id') id: string): Observable<any> {
    return this.clientProductService.send({ cmd: 'remove_product' }, { id });
  }
}
