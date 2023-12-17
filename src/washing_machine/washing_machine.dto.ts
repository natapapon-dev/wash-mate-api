import { ApiProperty } from '@nestjs/swagger';

export class TransactionReq {
  @ApiProperty({ type: Number, required: true, name: 'coin' })
  coin: number;
}

export class TransactionPayload extends TransactionReq {
  is_complete: boolean;
  price: number;
  washing_machine_location_id: number;
}

export class WatchingMachineReq {
  number: string;
  status: number;
}

export class WashingMachineUpdateReq extends WatchingMachineReq {
  uuid: string;
}
