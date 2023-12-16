import { Controller } from '@nestjs/common';
import { WashingMachineLocationService } from '../services/washing_machine_location.service';

@Controller('api/v1/washing-machine-location')
export class WashingMachineLocationController {
  constructor(private machineLocation: WashingMachineLocationService) {}
}
