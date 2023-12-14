import { Module } from '@nestjs/common';
import { BranchController } from './controllers/branch.controller';
import { BranchService } from './services/branch.service';
import { BranchTodoService } from './services/branch.todo.service';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  controllers: [BranchController],
  providers: [BranchService, BranchTodoService],
  exports: [BranchTodoService],
})
export class BranchModule {}
