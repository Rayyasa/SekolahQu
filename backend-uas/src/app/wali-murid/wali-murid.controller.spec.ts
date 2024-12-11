import { Test, TestingModule } from '@nestjs/testing';
import { WaliMuridController } from './wali-murid.controller';

describe('WaliMuridController', () => {
  let controller: WaliMuridController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaliMuridController],
    }).compile();

    controller = module.get<WaliMuridController>(WaliMuridController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
