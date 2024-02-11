import { NextFunction, Request, Response } from 'express'
import { Container } from 'typedi'
import { Order } from '@interfaces/orders.interface'
import { OrderService } from '@/services/orders.service'

export class OrderController {
  public order = Container.get(OrderService)

  public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orderData: Order = req.body
      const createOrderData: Order = await this.order.createOrder(orderData)

      res.status(201).json({ data: createOrderData, message: 'created' })
    } catch (error) {
      next(error)
    }
  }

  public getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllOrdersData: Order[] = await this.order.findAllOrder()

      res.status(200).json({ data: findAllOrdersData, message: 'findAll' })
    } catch (error) {
      console.info(error)
      next(error)
    }
  }
}
