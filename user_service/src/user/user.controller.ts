import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'create_user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'find_user' })  // Qo'shimcha xabar
  findOne(id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_user' })  // Qo'shimcha xabar
  update(data: { id: number; updateUserDto: UpdateUserDto }) {
    return this.userService.update(data.id, data.updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })  // Qo'shimcha xabar
  remove(id: number) {
    return this.userService.remove(id);
  }
}
