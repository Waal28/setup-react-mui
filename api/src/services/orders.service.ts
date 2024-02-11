import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateOrderDto } from '@dtos/orders.dto'
import { Order } from '@/interfaces/orders.interface'

@Service()
export class OrderService {
  public prisma = new PrismaClient()

  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const product = await this.prisma.product.findUnique({ where: { id: orderData.product_id } })

    let totalPrice
    if (orderData.discount !== undefined) {
      totalPrice = orderData.price * orderData.unit - orderData.discount
    } else {
      totalPrice = orderData.price * orderData.unit
    }
    const updateUnitProduct = product.unit - orderData.unit

    await this.prisma.product.update({
      where: { id: orderData.product_id },
      data: {
        unit: updateUnitProduct
      }
    })
    const createOrderData: Order = await this.prisma.order_Item.create({
      data: {
        product_id: orderData.product_id,
        customer_id: orderData.customer_id,
        unit: orderData.unit,
        price: totalPrice
      }
    })
    return createOrderData
  }

  public async findAllOrder(): Promise<any> {
    const allOrder: Order[] = await this.prisma.order_Item.findMany({
      include: {
        product: true,
        customer: true
      }
    })
    console.info('hello service')
    return allOrder
  }
}
