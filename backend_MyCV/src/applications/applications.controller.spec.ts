import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './applications.controller';
import { ApplicationService } from './applications.service';

describe('ApplicationsController', () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [ApplicationService],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
