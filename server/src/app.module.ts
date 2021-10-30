import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MdcinController } from './mdcin/mdcin.controller';
import { MdcinService } from './mdcin/mdcin.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [MdcinController],
  providers: [MdcinService],
})
export class AppModule {}
