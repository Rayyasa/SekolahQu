import { Test, TestingModule } from '@nestjs/testing';
import { WaliMuridService } from './wali-murid.service';

describe('WaliMuridService', () => {
  let service: WaliMuridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaliMuridService],
    }).compile();

    service = module.get<WaliMuridService>(WaliMuridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
