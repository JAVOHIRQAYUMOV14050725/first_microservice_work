import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private products: { id: number; name: string }[] = []; // Mahsulotlar ro'yxati

  // Yangi mahsulot qo'shish
  create(createProductDto: CreateProductDto): { status: boolean; message: string; data?: { id: number } } {
    const productId = this.products.length + 1; // Yangi ID yaratish
    const newProduct = { id: productId, name: createProductDto.name }; // Yangi mahsulot yaratish
    this.products.push(newProduct); // Mahsulotni ro'yxatga qo'shish
    return {
      status: true,
      message: `Yangi mahsulot qo'shildi. ID: ${productId}`,
      data: { id: productId },
    };
  }

  // Barcha mahsulotlarni olish
  findAll(): { status: boolean; data: { id: number; name: string }[] } {
    return {
      status: true,
      data: this.products,
    };
  }

  // ID bo'yicha mahsulotni topish
  findOne(id: number): { status: boolean; message: string; data?: { id: number; name: string } } {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      return { status: false, message: `ID: ${id} bo'yicha mahsulot topilmadi` };
    }
    return {
      status: true,
      message: `ID: ${id} bo'yicha mahsulot topildi`,
      data: product,
    };
  }

  // Mahsulotni yangilash
  update(id: number, updateProductDto: UpdateProductDto): { status: boolean; message: string } {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      return { status: false, message: `ID: ${id} bo'yicha mahsulot topilmadi` };
    }
    this.products[productIndex].name = updateProductDto.name; // Mahsulotni yangilash
    return {
      status: true,
      message: `ID: ${id} bo'yicha mahsulot yangilandi`,
    };
  }

  // Mahsulotni o'chirish
  remove(id: number): { status: boolean; message: string } {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
      return { status: false, message: `ID: ${id} bo'yicha mahsulot topilmadi` };
    }
    this.products.splice(productIndex, 1); // Mahsulotni o'chirish
    return {
      status: true,
      message: `ID: ${id} bo'yicha mahsulot o'chirildi`,
    };
  }
}
