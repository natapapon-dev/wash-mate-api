import { Module } from '@nestjs/common';
import { NotifyService } from './service/notify.service';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: process.env.LINE_API_URL,
        headers: {
          common: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        } as any,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }),
    }),
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
