import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotifyModule } from 'src/notify/notify.module';
@Module({
  imports: [NotifyModule],
  providers: [ShareService, PrismaService],
  exports: [ShareService, PrismaService, NotifyModule],
})
export class ShareModule {}
