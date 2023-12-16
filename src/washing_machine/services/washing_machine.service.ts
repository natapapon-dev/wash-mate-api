import { Injectable } from '@nestjs/common';
import { WashingMachineTodoService } from './washing_machine.todo.service';
import { ShareService } from 'src/share/share.service';
import { ResponseAPI } from 'src/share/share.dto';
import { TransactionPayload } from '../washing_machine.dto';

@Injectable()
export class WashingMachineService {
  constructor(
    private washingMachineTodo: WashingMachineTodoService,
    private shared: ShareService,
  ) {}

  async onInsertCoin(machine_id: string, coin: number): Promise<ResponseAPI> {
    let result: any;
    if (!this.shared.validateCoin(coin)) {
      result = this.shared.buildResponseAPI(null, 'invalid coin', false, 403);

      return result;
    }

    let washingMachine =
      await this.washingMachineTodo.toGetWashingMachineByUUID(machine_id);
    if (washingMachine) {
      result = await this.washingMachineTodo.toGetLastestTransaction(
        washingMachine.id,
      );
    } else {
      result = this.shared.buildResponseAPI(
        null,
        `couldn't find washing machine UUID ${machine_id}`,
        false,
        404,
      );

      return result;
    }

    if (result) {
      let insert_coin_full_at = null;
      let is_complete = false;
      if (coin + result.price === 60) {
        is_complete = true;
        insert_coin_full_at = new Date();
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
        result = this.shared.buildResponseAPI(null, e.message, false, 500);

        return result;
      }
    }

    if (result) {
      let message: string;
      message = 'successfully insert coin';

      if (result.is_complete) {
        message = 'complete insert coin';
      }

      result = this.shared.buildResponseAPI(result, message, true, 200);
    } else {
      result = this.shared.buildResponseAPI(
        result,
        'failed to create transaction',
        false,
        400,
      );
    }

    return result;
  }

  async setNotiTime(): Promise<any> {
    return;
  }
}
