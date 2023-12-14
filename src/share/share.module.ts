import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ShareService, PrismaService],
  exports: [ShareService, PrismaService],
})
export class ShareModule {}
