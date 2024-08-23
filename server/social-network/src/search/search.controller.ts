import { Controller, Get, Body, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('posts')
  async searchPosts(@Body() request: any) {
    return this.searchService.searchPosts(request.query);
  }

  @Get('person')
  async searchProfiles(@Body() request: any) {
    return this.searchService.searchProfiles(request.query);
  }

  @Get('any')
  async searchTags(@Query('q') q: string) {
    let profiles = await this.searchService.searchAny('dare_profiles', q);
    let posts = await this.searchService.searchAny('dare_posts', q);
    return {
      // profiles: profiles,
      posts: posts,
    };
  }
}
