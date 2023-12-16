import { Test, TestingModule } from '@nestjs/testing';
import { WashingMachineLocationController } from './washing_machine_location.controller';

describe('WashingMachineLocationController', () => {
  let controller: WashingMachineLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashingMachineLocationController],
    }).compile();

    controller = module.get<WashingMachineLocationController>(WashingMachineLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
