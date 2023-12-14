import { Injectable } from '@nestjs/common';
import { PrismaClient, WashingMachine } from '@prisma/client';

@Injectable()
export class WashingMachineTodoService {
  constructor(private prisma: PrismaClient) {}

  async toCreateWashingMachine(payload: WashingMachine): Promise<any> {
    let result = this.prisma.washingMachine.create({ data: payload });
  }

  async toUpdateWashingMachine(payload: WashingMachine): Promise<any> {
    let result = this.prisma.washingMachine.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async toUpdateWashingMachineStatus(id: number, status: number): Promise<any> {
    let result = this.prisma.washingMachine.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
  }
}
