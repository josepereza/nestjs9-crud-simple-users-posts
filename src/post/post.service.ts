import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const { title, content, userId } = createPostDto;
    const user = await this.userService.findOne(userId);

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update({ id }, { ...updatePostDto });
  }

  remove(id: number) {
    return this.postRepository.delete({ id });
  }
}
