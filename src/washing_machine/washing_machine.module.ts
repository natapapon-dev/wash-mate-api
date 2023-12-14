import { Module } from '@nestjs/common';
import { WashingMachineController } from './controllers/washing_machine.controller';
import { WashingMachineService } from './services/washing_machine.service';
import { WashingMachineTodoService } from './services/washing_machine.todo.service';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  controllers: [WashingMachineController],
  providers: [WashingMachineService, WashingMachineTodoService],
})
export class WashingMachineModule {}
