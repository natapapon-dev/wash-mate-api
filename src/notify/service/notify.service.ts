import { Injectable } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotifyService {
  constructor(private readonly httpService: HttpService) {}

  async notifyJob(branchToken: string, message: string): Promise<any> {
    branchToken = 'Fd4cZR76hLZF61zvAdhB754UpoL9E5h2EiJyA2IN2ht';
    try {
      const configBranchToken = {
        headers: {
          Authorization: `Bearer ${branchToken}`,
        },
      };

      const response = await this.httpService
        .post('/api/notify', `message=${message}`, configBranchToken)
        .toPromise();

      console.debug('LINE Notify response status:', response.status);
      console.debug('LINE Notify response data:', response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
