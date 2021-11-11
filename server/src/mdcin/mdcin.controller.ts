import {
  Controller,
  Get,
  Req,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MdcinService } from './mdcin.service';

@Controller('mdcin')
export class MdcinController {
  constructor(private mdcinService: MdcinService) {
    this.mdcinService = mdcinService;
  }

  @Get('items')
  async findAll(
    @Query('sort') sort: string = MdcinService.SORT_RECENT,
    @Query('take', ParseIntPipe) take: number = MdcinService.TAKE_DEFAULT,
    @Query('skip', ParseIntPipe) skip = 0,
  ) {
    return this.mdcinService.findAll(sort, take, skip);
  }
}
