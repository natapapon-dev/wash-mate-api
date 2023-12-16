import { Injectable } from '@nestjs/common';
import { WashingMachineLocationTodoService } from './washing_machine_location.todo.service';

@Injectable()
export class WashingMachineLocationService {
  constructor(private washingMachineTodo: WashingMachineLocationTodoService) {}
}
