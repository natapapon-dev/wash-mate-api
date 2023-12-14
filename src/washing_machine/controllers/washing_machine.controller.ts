import { Controller, Post, Param, Query, Body } from '@nestjs/common';
import { WashingMachineService } from '../services/washing_machine.service';
import { ShareService } from 'src/share/share.service';
import { ResponseAPI } from 'src/share/share.dto';
import { TransactionReq } from '../washing_machine.dto';

@Controller('api/v1/washing-machine')
export class WashingMachineController {
  constructor(
    private washingMachine: WashingMachineService,
    private shared: ShareService,
  ) {}

  @Post()
  async createWashingMachine(): Promise<ResponseAPI> {
    let result: any;
    try {
    } catch (e) {
      result = this.shared.buildResponseAPI(null, e, false, 500);
    }

    return result;
  }

  @Post(':machine_id/insert-coin')
  async insertCoin(
    @Query('machine_id') machine_id: string,
    @Body() req: TransactionReq,
  ): Promise<ResponseAPI> {
    let result: any;

    try {
      result = this.washingMachine.onInsertCoin(machine_id, req.coin);
    } catch (e) {
      result = this.shared.buildResponseAPI(null, e, false, 500);
    }

    return result;
  }
}
