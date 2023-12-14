import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareModule } from './share/share.module';
import { WashingMachineModule } from './washing_machine/washing_machine.module';

@Module({
  imports: [ShareModule, WashingMachineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
