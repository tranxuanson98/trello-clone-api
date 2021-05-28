import { Test, TestingModule } from '@nestjs/testing';
import { ObjectActivityService } from './object-activity.service';

describe('ObjectActivityService', () => {
  let service: ObjectActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectActivityService],
    }).compile();

    service = module.get<ObjectActivityService>(ObjectActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
