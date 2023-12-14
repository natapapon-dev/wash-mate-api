import { Injectable } from '@nestjs/common';
import { ResponseAPI } from './share.dto';

@Injectable()
export class ShareService {
  buildResponseAPI(
    data: any,
    message: string,
    status: boolean,
    http_code: number,
  ): ResponseAPI {
    const resp: ResponseAPI = new ResponseAPI();
    resp.data = data;
    resp.status = status;
    resp.message = message;
    resp.http_code = http_code;

    return resp;
  }
}
