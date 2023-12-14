import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WashingMachine, Branch } from '@prisma/client';

@Injectable()
export class BranchTodoService {
  constructor(private prisma: PrismaService) {}

  async toGetAvailbleByBranch(branch_id: number): Promise<WashingMachine[]> {
    const result = await this.prisma.washingMachine.findMany({
      where: {
        WashingMachineLocation: { some: { branch_id: branch_id, status: 0 } },
      },
      orderBy: { id: 'asc' },
    });
    return result;
  }

  async toGetBranchByUUID(uuid: string): Promise<Branch> {
    const result = await this.prisma.branch.findFirst({
      where: { uuid: uuid },
    });

    return result;
  }
}
