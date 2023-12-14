import { Injectable } from '@nestjs/common';
import { WashingMachineTodoService } from './washing_machine.todo.service';
import { ShareService } from 'src/share/share.service';
import { ResponseAPI } from 'src/share/share.dto';
import { TransactionPayload } from '../washing_machine.dto';

@Injectable()
export class WashingMachineService {
  response = new ResponseAPI();

  constructor(
    private washingMachineTodo: WashingMachineTodoService,
    private shared: ShareService,
  ) {}

  async onInsertCoin(machine_id: string, coin: number): Promise<ResponseAPI> {
    let result: any;
    if (!this.shared.validateCoin(coin)) {
      this.response.data = null;
      this.response.message = 'invalid coin';
      this.response.status = false;
      this.response.http_code = 403;
      result = this.response;

      return result;
    }

    let washingMachine =
      await this.washingMachineTodo.toGetWashingMachineByUUID(machine_id);
    if (washingMachine) {
      result = await this.washingMachineTodo.toGetLastestTransaction(
        washingMachine.id,
      );
    } else {
      this.response.data = null;
      this.response.message = `couldn't find washing machine UUID ${machine_id}`;
      this.response.status = false;
      this.response.http_code = 404;

      result = this.response;

      return result;
    }

    if (result) {
      let insert_coin_full_at = null;
      let is_complete = false;
      if (coin + result.price === 60) {
        (is_complete = true), (insert_coin_full_at = new Date());
      }
      result = await this.washingMachineTodo.toUpdateCurrentTransaction(
        result.id,
        coin + result.price,
        is_complete,
        insert_coin_full_at,
      );
    } else {
      let transaction: TransactionPayload = new TransactionPayload();
      transaction.is_complete = false;
      transaction.washing_machine_location_id =
        washingMachine['WashingMachineLocation'][0].id;
      transaction.price = coin;

      try {
        result = await this.washingMachineTodo.toCreateTransaction(transaction);
      } catch (e) {
        this.response.status = false;
        this.response.message = e.message;
        this.response.http_code = 500;
        result = this.response;

        return result;
      }
    }

    if (result) {
      this.response.data = result;
      this.response.message = 'successfully insert coin';

      if (result.is_complete) {
        this.response.message = 'complete insert coin';
      }

      this.response.status = true;
      this.response.http_code = 200;
      result = this.response;
    } else {
      this.response.data = result;
      this.response.message = 'failed to create transaction';
      this.response.status = false;
      this.response.http_code = 400;
      result = this.response;
    }

    return result;
  }

  async setNotiTime(): Promise<any> {
    return;
  }
}
