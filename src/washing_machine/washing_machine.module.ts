import { Module } from '@nestjs/common';
import { WashingMachineController } from './controllers/washing_machine.controller';
import { WashingMachineService } from './services/washing_machine.service';
import { WashingMachineTodoService } from './services/washing_machine.todo.service';
import { ShareModule } from 'src/share/share.module';
import { WashingMachineLocationModule } from 'src/washing_machine_location/washing_machine_location.module';
import { BranchModule } from 'src/branch/branch.module';

@Module({
  imports: [ShareModule, WashingMachineLocationModule, BranchModule],
  controllers: [WashingMachineController],
  providers: [WashingMachineService, WashingMachineTodoService],
})
export class WashingMachineModule {}
