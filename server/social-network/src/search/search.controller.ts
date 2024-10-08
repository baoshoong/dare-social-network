import { Controller, Get, Query, Delete, Param } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('posts')
  async searchPosts(@Query('q') query: string) {
    return this.searchService.searchPosts(query);
  }

  @Get('person')
  async searchProfiles(@Query('q') query: string) {
    return this.searchService.searchUser(query); // Sử dụng phương thức mới để tìm kiếm người dùng
  }

  @Get('any')
  async searchTags(@Query('q') q: string) {
    let profiles = await this.searchService.searchAny('dare_profiles', q);
    let posts = await this.searchService.searchAny('dare_posts', q);
    return {
      profiles: profiles,
      posts: posts,
    };
  }

  @Get()
  findAll() {
    return this.searchService.getAllIndexPosts();
  }

  @Delete('posts/:id')
  async deleteIndexPost(@Param('id') id: number) {
    return this.searchService.deleteIndexPost(id);
  }
}
