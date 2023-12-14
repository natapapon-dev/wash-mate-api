import { Test, TestingModule } from '@nestjs/testing';
import { WashingMachineService } from './washing_machine.service';

describe('WashingMachineService', () => {
  let service: WashingMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashingMachineService],
    }).compile();

    service = module.get<WashingMachineService>(WashingMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
