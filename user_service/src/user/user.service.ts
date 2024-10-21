import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    this.validateCreateUserDto(createUserDto);

    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);

    return {
      status: 'success',
      message: 'Yangi foydalanuvchi muvaffaqiyatli yaratildi',
      data: newUser,
    };
  }

  async findAll() {
    const users = await this.userRepository.find();

    return {
      status: 'success',
      message: 'Barcha foydalanuvchilar muvaffaqiyatli olindi',
      data: users,
    };
  }

  async findOne(id: number) {
    const user = await this.getUserById(id);
    return {
      status: 'success',
      message: `Foydalanuvchi muvaffaqiyatli topildi (ID: ${id})`,
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.validateUpdateUserDto(updateUserDto);

    const user = await this.getUserById(id);
    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    return {
      status: 'success',
      message: `Foydalanuvchi muvaffaqiyatli yangilandi (ID: ${id})`,
      data: updatedUser,
    };
  }

  async remove(id: number) {
    const user = await this.getUserById(id);
    await this.userRepository.delete(user.id);

    return {
      status: 'success',
      message: `Foydalanuvchi muvaffaqiyatli o'chirildi (ID: ${id})`,
      data: null,
    };
  }

  private async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi topilmadi (ID: ${id})`);
    }
    return user;
  }

  private validateCreateUserDto(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new BadRequestException('Foydalanuvchi ma\'lumotlari kiritilmadi');
    }

    if (!createUserDto.name || !createUserDto.password) {
      throw new BadRequestException('Foydalanuvchi nomi va parol kiritilishi shart');
    }

    if (createUserDto.password.length !== 6 || !/^[0-9]+$/.test(createUserDto.password)) {
      throw new BadRequestException('Parol faqat raqamlardan iborat bo\'lishi va 6 belgidan iborat bo\'lishi kerak');
    }
  }

  private validateUpdateUserDto(updateUserDto: UpdateUserDto) {
    if (!updateUserDto) {
      throw new BadRequestException('Yangilanish ma\'lumotlari kiritilmadi');
    }
  }
}
