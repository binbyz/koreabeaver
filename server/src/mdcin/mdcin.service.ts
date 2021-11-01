import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Data24RawMdcin } from './entities/data24_raw_mdcin.entity';

@Injectable()
export class MdcinService {
  constructor(
    @InjectRepository(Data24RawMdcin)
    private mdcinRepository: Repository<Data24RawMdcin>,
  ) {}

  findAll(): Promise<Data24RawMdcin[]> {
    return this.mdcinRepository.find();
  }

  findOne(id: number): Promise<Data24RawMdcin> {
    return this.mdcinRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.mdcinRepository.delete(id);
  }
}
