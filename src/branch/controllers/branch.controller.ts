import { Controller, Post, Patch, Delete, Get, Param } from '@nestjs/common';
import { ResponseAPI } from 'src/share/share.dto';
import { ShareService } from 'src/share/share.service';
import { BranchService } from '../services/branch.service';

@Controller('api/v1/branch')
export class BranchController {
  constructor(
    private share: ShareService,
    private branch: BranchService,
  ) {}

  @Get(':uuid/washing-machine')
  async getAvailableByBranch(
    @Param('uuid') uuid: string,
  ): Promise<ResponseAPI> {
    let result: ResponseAPI;

    try {
      result = await this.branch.onGetAvailbleByBranch(uuid);
    } catch (e) {
      result = this.share.buildResponseAPI(null, e.message, false, 500);
    }

    return result;
  }
}
