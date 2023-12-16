export class WashingMachineLocationCreateReq {
  washing_machine_id: number;
  branch_id: number;
  status: number;
}

export class WashingMachineLocationUpdateReq extends WashingMachineLocationCreateReq {
  id: number;
  uuid: string;
}
