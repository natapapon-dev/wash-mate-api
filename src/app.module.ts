import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareModule } from './share/share.module';
import { WashingMachineModule } from './washing_machine/washing_machine.module';
import { BranchModule } from './branch/branch.module';
import { WashingMachineLocationModule } from './washing_machine_location/washing_machine_location.module';

@Module({
  imports: [ShareModule, WashingMachineModule, BranchModule, WashingMachineLocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
