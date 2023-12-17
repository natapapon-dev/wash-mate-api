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
            Authorization: `Bearer ${process.env.LINE_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        } as any,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Set to true to enable SSL verification
          // Other SSL options can be set here
        }),
      }),
    }),
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
