import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const user = new User();
    const { password, ...UserDto } = createUserDto;
    const hash = await bcrypt.hash(password, saltOrRounds);
    user.password = hash;
    return await this.usersRepository.save({
      password: user.password,
      ...UserDto,
    });
  }

  findAll() {
    return this.usersRepository.find({
      relations: { posts: true },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('usuario no existe');
    }
    return user;
  }

  async getUser(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('usuario no existe');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update({ id }, { ...updateUserDto });
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
