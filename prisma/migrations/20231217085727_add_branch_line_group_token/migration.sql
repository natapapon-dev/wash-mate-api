-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "branch_line_group_token" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "expired_at" SET DEFAULT NOW() + interval '5 minutes';
