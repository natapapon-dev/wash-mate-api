export class TransactionReq {
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
