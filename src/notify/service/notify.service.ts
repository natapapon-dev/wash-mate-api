import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotifyService {
  constructor(private readonly httpService: HttpService) {}

  async postMessage(message: string): Promise<any> {
    try {
      const response = await this.httpService
        .post('/api/notify', `message=${message}`)
        .toPromise();

      console.log('LINE Notify response status:', response.status);
      console.log('LINE Notify response data:', response.data);

      return response.data;
    } catch (error) {
      console.error('Error sending LINE Notify:', error.message);
      throw error;
    }
  }
}
