import { Test, TestingModule } from '@nestjs/testing';
import { CvuserService } from './cvuser.service';

describe('CvuserService', () => {
  let service: CvuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvuserService],
    }).compile();

    service = module.get<CvuserService>(CvuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
