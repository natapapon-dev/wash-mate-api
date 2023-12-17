import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { WashingMachineTodoService } from './washing_machine.todo.service';
import { ShareService } from 'src/share/share.service';
import { ResponseAPI } from 'src/share/share.dto';
import { TransactionPayload } from '../washing_machine.dto';
import { InjectQueue } from '@nestjs/bull';
import { NotifyService } from 'src/notify/service/notify.service';
import { WashingMachineLocationTodoService } from 'src/washing_machine_location/services/washing_machine_location.todo.service';

@Injectable()
export class WashingMachineService {
  constructor(
    private washingMachineTodo: WashingMachineTodoService,
    private washingMachineLocationTodo: WashingMachineLocationTodoService,
    private shared: ShareService,
    private schdule: SchedulerRegistry,
    private notify: NotifyService,
  ) {}

  async onTest(): Promise<ResponseAPI> {
    let result: any;
    result = await this.notify.postMessage();
    console.log(result);
    return result;
  }

  async onInsertCoin(machine_id: string, coin: number): Promise<ResponseAPI> {
    let result: any;

    if (!this.shared.validateCoin(coin)) {
      result = this.shared.buildResponseAPI(null, 'invalid coin', false, 403);

      return result;
    }

    let washingMachine =
      await this.washingMachineTodo.toGetWashingMachineByUUID(machine_id);

    if (washingMachine) {
      if (washingMachine['WashingMachineLocation'].length < 1) {
        result = this.shared.buildResponseAPI(
          null,
          `This machine is currently in used`,
          false,
          403,
        );

        return result;
      }

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

      if (result.is_complete) {
        const update_wm_status =
          await this.washingMachineLocationTodo.toUpdateMachineLocationStatus(
            2,
            result.washing_machine_location_id,
          );

        if (!update_wm_status) {
          result = this.shared.buildResponseAPI(
            null,
            'update washing machine status failed',
            false,
            400,
          );

          return result;
        } else {
          await this.washingMachineTodo.toUpdateWashingMachineStatus(
            washingMachine.id,
            2,
          );
          this.delayedExecution(
            2 * 60 * 1000,
            result.washing_machine_location_id,
          );

          // this.setNotiLineCountDown(result.washing_machine_location_id);
        }
      }
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

  delayedExecution(delay: number, machineLocationId: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.setNotiLineCountDown(machineLocationId);
        resolve();
      }, delay);
    });
  }

  // @Cron('50 * * * * *')
  async setNotiLineCountDown(machineLocationId: number) {
    const result =
      await this.washingMachineLocationTodo.toUpdateMachineLocationStatus(
        0,
        machineLocationId,
      );

    const result_w = await this.washingMachineTodo.toUpdateWashingMachineStatus(
      result.washing_machine_id,
      0,
    );

    console.log('Called when is 1 minute');
    console.debug(result);
    console.debug(result_w);
  }
}
