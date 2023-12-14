import { Module } from '@nestjs/common';
import { WashingMachineController } from './controllers/washing_machine.controller';
import { WashingMachineService } from './services/washing_machine.service';
import { WashingMachineTodoService } from './services/washing.todo.service';

@Module({
  controllers: [WashingMachineController],
  providers: [WashingMachineService, WashingMachineTodoService],
  exports: [WashingMachineTodoService],
})
export class WashingMachineModule {}
