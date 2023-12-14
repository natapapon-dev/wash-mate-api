import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bc = await prisma.branch.count();
  if (bc === 0) {
    const branch1 = await prisma.branch.create({
      data: { branch_name: 'แม่เหียะ', branch_address: 'แม่เหียะ 50100' },
    });

    const branch2 = await prisma.branch.create({
      data: { branch_name: 'หนองหาร', branch_address: 'หนองหาร 50600' },
    });
  }

  let br = '';
  const wc = await prisma.washingMachine.count();
  if (wc === 0) {
    for (let i = 0; i < 30; i++) {
      if (i <= 10) {
        br = 'm';
      } else if (i <= 20) {
        br = 'h';
      } else {
        br = 'b';
      }
      let w = await prisma.washingMachine.create({
        data: { number: `${br}-${i + 1}`, status: 0 },
      });
    }
  }

  const wlc = await prisma.washingMachineLocation.count();

  if (wlc === 0) {
    const wm = await prisma.washingMachine.findMany({ take: 10 });
    for (let i = 0; i < 10; i++) {
      let r = await prisma.washingMachineLocation.create({
        data: {
          status: 0,
          washing_machine_id: wm[i].id,
          branch_id: 1,
        },
      });
      console.log(r);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
