import { NextFunction, Request, Response } from 'express'
import { Container } from 'typedi'
import { Customer } from '@/interfaces/customer.interface'
import { CustomerService } from '@/services/customers.service'

export class CustomerController {
  public customer = Container.get(CustomerService)

  public getCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllcustomersData: Customer[] = await this.customer.findAllCustomer()

      res.status(200).json({ data: findAllcustomersData, message: 'findAll' })
    } catch (error) {
      next(error)
    }
  }

  public searchCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, phone } = req.query as { name: string; phone: string }

      let findSearchDataCustomer: Customer[]

      if (name !== undefined) {
        findSearchDataCustomer = await this.customer.findSearchNameCustomer(name)
      }

      if (phone !== undefined) {
        findSearchDataCustomer = await this.customer.findSearchPhoneCustomer(phone)
      }

      res.status(200).json({ data: findSearchDataCustomer, message: 'success' })
    } catch (error) {
      next(error)
    }
  }

  public getCustomerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customerId = req.params.id
      const findOneCustomerData: Customer = await this.customer.findCustomerById(customerId)

      res.status(200).json({ data: findOneCustomerData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }

  public createCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customerData: Customer = req.body
      const createCustomerData: Customer = await this.customer.createCustomer(customerData)

      res.status(201).json({ data: createCustomerData, message: 'created' })
    } catch (error) {
      next(error)
    }
  }

  public updateCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customerId = req.params.id
      const customerData: Customer = req.body
      const updateCustomerData: Customer = await this.customer.updateCustomer(customerId, customerData)

      res.status(200).json({ data: updateCustomerData, message: 'updated' })
    } catch (error) {
      next(error)
    }
  }

  public deleteCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customerId = req.params.id
      const deleteCustomerData: Customer = await this.customer.deleteCustomer(customerId)

      res.status(200).json({ data: deleteCustomerData, message: 'deleted' })
    } catch (error) {
      next(error)
    }
  }
}
