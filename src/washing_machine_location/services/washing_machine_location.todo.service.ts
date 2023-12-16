import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  WashingMachineLocationCreateReq,
  WashingMachineLocationUpdateReq,
} from '../washing_machine_location.dto';
import { WashingMachineLocation } from '@prisma/client';

@Injectable()
export class WashingMachineLocationTodoService {
  constructor(private prisma: PrismaService) {}

  async toCreateMachineLocation(
    payload: WashingMachineLocationCreateReq,
  ): Promise<WashingMachineLocation> {
    const result = await this.prisma.washingMachineLocation.create({
      data: payload,
    });

    return result;
  }

  async toUpdateMachineLocation(
    payload: WashingMachineLocationUpdateReq,
  ): Promise<WashingMachineLocation> {
    const result = await this.prisma.washingMachineLocation.update({
      where: { id: payload.id },
      data: payload,
    });

    return result;
  }

  async toUpdateMachineLocationStatus(
    status: number,
    id: number,
  ): Promise<WashingMachineLocation> {
    const result = await this.prisma.washingMachineLocation.update({
      where: { id: id },
      data: { status: status },
    });

    return result;
  }
}
