import { Test, TestingModule } from '@nestjs/testing';
import { MdcinController } from './mdcin.controller';

describe('MdcinController', () => {
  let controller: MdcinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MdcinController],
    }).compile();

    controller = module.get<MdcinController>(MdcinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
