import { Test, TestingModule } from '@nestjs/testing';
import { WashingMachineLocationService } from './washing_machine_location.service';

describe('WashingMachineLocationService', () => {
  let service: WashingMachineLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashingMachineLocationService],
    }).compile();

    service = module.get<WashingMachineLocationService>(WashingMachineLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
