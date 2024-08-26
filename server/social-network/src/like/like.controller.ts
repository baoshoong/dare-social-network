import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @Delete(':likeId')
  async remove(@Param('likeId') postId: number) {
    return this.likeService.deleteLikeByPostId(postId);
  }

  //get by post id
  @Get(':postId')
  async getLikesByPostId(@Param('postId') postId: number) {
    try {
      return this.likeService.getLikeByPostId(postId);
    } catch (e) {
      return [];
    }
  }

  @Get('count/:postId')
  async countLikesByPostId(@Param('postId') postId: number) {
    console.log('postIdController', postId);
    console.log('postIdControllertype', typeof postId);
    try {
      return this.likeService.countLikesByPostId(postId);
    } catch (e) {
      return [];
    }
  }
}
