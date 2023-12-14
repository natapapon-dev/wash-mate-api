-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "insert_coin_full_at" TIMESTAMP(3) NOT NULL,
    "is_complete" BOOLEAN NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WashingMachine" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "WashingMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WashingMachineLocation" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "status" INTEGER NOT NULL,
    "washing_machine_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,

    CONSTRAINT "WashingMachineLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "branch_name" TEXT NOT NULL,
    "branch_address" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WashingMachineLocation" ADD CONSTRAINT "WashingMachineLocation_washing_machine_id_fkey" FOREIGN KEY ("washing_machine_id") REFERENCES "WashingMachine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WashingMachineLocation" ADD CONSTRAINT "WashingMachineLocation_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
