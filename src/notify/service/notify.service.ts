import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotifyService {
  constructor(private readonly httpService: HttpService) {}

  async notifyJob(branchToken: string, message: string): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${branchToken}`,
      };

      const payload = {
        message: message,
      };

      const response = await this.httpService
        .post('/api/notify', payload, { headers })
        .toPromise();

      console.debug('LINE Notify response status:', response.status);
      console.debug('LINE Notify response data:', response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
