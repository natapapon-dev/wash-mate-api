/*
  Warnings:

  - Added the required column `washing_machine_location_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "washing_machine_location_id" INTEGER NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "is_complete" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_washing_machine_location_id_fkey" FOREIGN KEY ("washing_machine_location_id") REFERENCES "WashingMachineLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
