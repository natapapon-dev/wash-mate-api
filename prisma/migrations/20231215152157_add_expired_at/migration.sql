-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '5 minutes';
