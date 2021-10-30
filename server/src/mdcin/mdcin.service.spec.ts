import { Test, TestingModule } from '@nestjs/testing';
import { MdcinService } from './mdcin.service';

describe('MdcinService', () => {
  let service: MdcinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MdcinService],
    }).compile();

    service = module.get<MdcinService>(MdcinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
