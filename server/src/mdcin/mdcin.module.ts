import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Data24RawMdcin } from './entities/data24_raw_mdcin.entity';
import { MdcinController } from './mdcin.controller';
import { MdcinService } from './mdcin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Data24RawMdcin])],
  controllers: [MdcinController],
  providers: [MdcinService],
})
export class MdcinModule {}
