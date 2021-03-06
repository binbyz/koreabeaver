import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Data24RawMdcin } from './entities/data24_raw_mdcin.entity';

@Injectable()
export class MdcinService {
  public static readonly SORT_RECENT = 'recent';
  public static readonly TAKE_DEFAULT = 1000;

  constructor(
    @InjectRepository(Data24RawMdcin)
    private mdcinRepository: Repository<Data24RawMdcin>,
  ) {}

  private static getSortFieldName(sort: string): [string, string] {
    switch (sort) {
      case MdcinService.SORT_RECENT:
        return ['id', 'DESC'];
      default:
        return ['id', 'DESC'];
    }
  }

  findAll(sort: string, take: number, skip: number): Promise<Data24RawMdcin[]> {
    const [sortField, sortType] = MdcinService.getSortFieldName(sort);

    const fields: (keyof Data24RawMdcin)[] = [
      'id',
      'ENTP_NO',
      'ENTP_NAME',
      'ADDR',
      'ITEM_NAME',
      'LAST_SETTLE_DATE',
      'EXPOSE_CONT',
    ];

    return this.mdcinRepository.find({
      select: fields,
      take: take,
      skip: skip,
      order: {
        [sortField]: sortType,
      },
    });
  }

  findOne(id: number): Promise<Data24RawMdcin> {
    return this.mdcinRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mdcinRepository.delete(id);
  }
}
