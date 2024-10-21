import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @MessagePattern({ cmd: 'create_product' })
  create(createProduct: any) {
    return this.productService.create(createProduct);
  }

  @MessagePattern({ cmd: 'get_product' })
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'find_product' })
  findOne(id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(data: { id: number; updateProduct: any }) {
    return this.productService.update(data.id, data.updateProduct);
  }

  @MessagePattern({ cmd: 'remove_product' })
  remove(id: number) {
    return this.productService.remove(id);
  }
}
