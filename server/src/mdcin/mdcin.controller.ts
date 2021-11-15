import {
  Controller,
  Get,
  Req,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MdcinService } from './mdcin.service';
import { Data24RawMdcin } from './entities/data24_raw_mdcin.entity';

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
    @Query('brief', ParseIntPipe) brief = 1,
  ) {
    const response = await this.mdcinService.findAll(sort, take, skip);
    const result: Partial<Data24RawMdcin>[] = [];

    response.forEach((row: Partial<Data24RawMdcin>) => {
      if (brief) {
        if (row.EXPOSE_CONT != undefined) {
          row.EXPOSE_CONT =
            row.EXPOSE_CONT.length > 100
              ? row.EXPOSE_CONT.substr(0, 100) + '...'
              : row.EXPOSE_CONT;
        }
      }

      result.push(row);
    });

    return result;
  }

  @Get('item/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mdcinService.findOne(id);
  }
}
