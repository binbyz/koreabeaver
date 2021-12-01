import { Controller, Get, Query } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get('list')
  list(@Query('word') word: string) {

  }
}
