import { Test, TestingModule } from '@nestjs/testing';
import { WashingMachineController } from './washing_machine.controller';

describe('WashingMachineController', () => {
  let controller: WashingMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashingMachineController],
    }).compile();

    controller = module.get<WashingMachineController>(WashingMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
