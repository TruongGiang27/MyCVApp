import { Test, TestingModule } from '@nestjs/testing';
import { CvuserController } from './cvuser.controller';
import { CvuserService } from './cvuser.service';

describe('CvuserController', () => {
  let controller: CvuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvuserController],
      providers: [CvuserService],
    }).compile();

    controller = module.get<CvuserController>(CvuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
