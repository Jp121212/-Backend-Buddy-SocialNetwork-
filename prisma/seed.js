// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const jobData = [
//   {
//     title: 'Data Scientist',
//     location: 'Costa Rica / Remote',
//     salary: '$60,000/Year'
//   }
// ]

// async function main() {
//   console.log(` 🌱 Start seeding ...`)
//   for (const j of jobData) {
//     const job = await prisma.job.create({
//       data: j,
//     })
//     console.log(`Created job with id: ${job.id}`)
//   }
//   console.log(`🪴 Seeding finished.`)
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
