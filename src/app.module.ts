import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareModule } from './share/share.module';
import { WashingMachineModule } from './washing_machine/washing_machine.module';
import { BranchModule } from './branch/branch.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { WashingMachineLocationModule } from './washing_machine_location/washing_machine_location.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ScheduleModule.forRoot(),
    ShareModule,
    WashingMachineModule,
    BranchModule,
    WashingMachineLocationModule,
    NotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
