import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Database ready — portfolio content is served from shared-data package.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
