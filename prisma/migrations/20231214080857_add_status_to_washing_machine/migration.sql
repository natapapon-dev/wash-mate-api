/*
  Warnings:

  - Added the required column `status` to the `WashingMachine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WashingMachine" ADD COLUMN     "status" INTEGER NOT NULL;
