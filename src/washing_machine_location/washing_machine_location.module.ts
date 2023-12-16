import { Module } from '@nestjs/common';
import { WashingMachineLocationController } from './controllers/washing_machine_location.controller';
import { WashingMachineLocationService } from './services/washing_machine_location.service';
import { WashingMachineLocationTodoService } from './services/washing_machine_location.todo.service';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  controllers: [WashingMachineLocationController],
  providers: [WashingMachineLocationService, WashingMachineLocationTodoService],
  exports: [WashingMachineLocationTodoService],
})
export class WashingMachineLocationModule {}
