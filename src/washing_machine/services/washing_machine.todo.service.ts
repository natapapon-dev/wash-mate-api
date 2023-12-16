import { Injectable } from '@nestjs/common';
import { WashingMachine } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionPayload } from '../washing_machine.dto';

@Injectable()
export class WashingMachineTodoService {
  constructor(private prisma: PrismaService) {}

  async toGetWashingMachineByUUID(uuid: string): Promise<WashingMachine> {
    const result = await this.prisma.washingMachine.findFirst({
      where: { uuid: uuid },
      include: {
        WashingMachineLocation: {
          where: {
            status: 0,
          },
        },
      },
    });
    return result;
  }

  async toCreateWashingMachine(
    payload: WashingMachine,
  ): Promise<WashingMachine> {
    const result = await this.prisma.washingMachine.create({ data: payload });
    return result;
  }

  async toUpdateWashingMachine(
    payload: WashingMachine,
  ): Promise<WashingMachine> {
    const result = await this.prisma.washingMachine.update({
      where: { id: payload.id },
      data: payload,
    });
    return result;
  }

  async toUpdateWashingMachineStatus(
    id: number,
    status: number,
  ): Promise<WashingMachine> {
    const result = await this.prisma.washingMachine.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
    return result;
  }

  async toCreateTransaction(payload: TransactionPayload): Promise<any> {
    const result = await this.prisma.transaction.create({
      data: {
        price: payload.price,
        is_complete: payload.is_complete,
        insert_coin_full_at: null,
        WashingMachineLocation: {
          connect: { id: payload.washing_machine_location_id },
        },
      },
    });
    return result;
  }

  async toUpdateCurrentTransaction(
    id: number,
    balance: number,
    is_complete: boolean,
    insert_coin_full_at: Date,
  ): Promise<any> {
    const result = await this.prisma.transaction.update({
      where: { id: id },
      data: {
        price: balance,
        is_complete: is_complete,
        insert_coin_full_at: insert_coin_full_at,
      },
    });
    return result;
  }

  async toGetLastestTransaction(machine_id: number): Promise<any> {
    const result = await this.prisma.transaction.findFirst({
      where: {
        washing_machine_location_id: machine_id,
        is_complete: false,
        expired_at: { gt: new Date() },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 1,
    });
    return result;
  }
}
