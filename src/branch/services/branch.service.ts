import { Injectable } from '@nestjs/common';
import { BranchTodoService } from './branch.todo.service';
import { ResponseAPI } from 'src/share/share.dto';

@Injectable()
export class BranchService {
  response = new ResponseAPI();
  constructor(private branchTodo: BranchTodoService) {}

  async onGetAvailbleByBranch(uuid: string): Promise<ResponseAPI> {
    let result: any;
    const branch = await this.branchTodo.toGetBranchByUUID(uuid);

    if (!branch) {
      this.response.data = null;
      this.response.message = `Can't find branch ID: ${uuid}`;
      this.response.status = false;
      this.response.http_code = 404;

      result = this.response;
      return result;
    }

    result = await this.branchTodo.toGetAvailbleByBranch(branch.id);
    console.log(result);

    if (result.length === 0) {
      this.response.data = null;
      this.response.message = `No available Washing Machine At Branch:: ${branch.branch_name}`;
      this.response.status = false;
      this.response.http_code = 404;

      result = this.response;
      return result;
    }

    this.response.data = result;
    this.response.message = 'success';
    this.response.status = true;
    this.response.http_code = 200;

    result = this.response;

    return result;
  }
}
