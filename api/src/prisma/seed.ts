import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.admin.create({
    data: {
      name: 'admin',
      phone: '6282283354119',
      email: 'admin@gmail.com',
      password: await hash('admin123', 10),
      address: 'jln.swakaraya,pekanbaru'
    }
  })

  console.log({ admin })

  const customers = await prisma.customer.createMany({
    data: [
      {
        name: 'customer1',
        phone: '6282283354118',
        email: 'customer1@gmail.com',
        address: 'jln.karya 1,pekanbaru'
      },
      {
        name: 'customer2',
        phone: '6282283354112',
        email: 'customer2@gmail.com',
        address: 'jln.karya 2,pekanbaru'
      },
      {
        name: 'customer3',
        phone: '6282283354117',
        email: 'customer3@gmail.com',
        address: 'jln.karya 3,pekanbaru'
      }
    ]
  })

  console.info({ customers })

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'product 1',
        unit: 10,
        price: 100000
      },
      {
        name: 'product 2',
        unit: 9,
        price: 100000
      },
      {
        name: 'product 3',
        unit: 5,
        price: 100000
      },
      {
        name: 'product 4',
        unit: 7,
        price: 50000
      },
      {
        name: 'product 5',
        unit: 10,
        price: 70000
      },
      {
        name: 'product 6',
        unit: 2,
        price: 90000
      },
      {
        name: 'product 7',
        unit: 3,
        price: 300000
      },
      {
        name: 'product 8',
        unit: 11,
        price: 100000
      },
      {
        name: 'product 9',
        unit: 20,
        price: 200000
      },
      {
        name: 'product 10',
        unit: 5,
        price: 80000
      }
    ]
  })

  console.info({ products })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
