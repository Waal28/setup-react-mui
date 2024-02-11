import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { CreateCustomerDto } from '@dtos/customer.dto'
import { HttpException } from '@/exceptions/HttpException'
import { Customer } from '@/interfaces/customer.interface'

@Service()
export class CustomerService {
  public customer = new PrismaClient().customer

  public async findAllCustomer(): Promise<Customer[]> {
    const allCustomer: Customer[] = await this.customer.findMany()
    return allCustomer
  }

  public async findCustomerById(customerId: string): Promise<Customer> {
    const findCustomer: Customer = await this.customer.findUnique({ where: { id: customerId } })
    if (!findCustomer) throw new HttpException(409, "Customer doesn't exist")

    return findCustomer
  }

  public async findSearchNameCustomer(param: string): Promise<Customer[]> {
    const name = await this.customer.findMany({
      where: {
        name: {
          contains: param
        }
      }
    })

    return name
  }

  public async findSearchPhoneCustomer(param: string): Promise<Customer[]> {
    const phone = await this.customer.findMany({
      where: {
        phone: {
          contains: param
        }
      }
    })

    return phone
  }

  public async createCustomer(customerData: CreateCustomerDto): Promise<Customer> {
    const findUser: Customer = await this.customer.findUnique({ where: { email: customerData.email } })
    if (findUser) throw new HttpException(409, `This email ${customerData.email} already exists`)

    const createUserData: Customer = await this.customer.create({
      data: {
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email,
        address: customerData.address
      }
    })
    return createUserData
  }

  public async updateCustomer(customerId: string, customerData: CreateCustomerDto): Promise<Customer> {
    const findUser: Customer = await this.customer.findUnique({ where: { id: customerId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    const updateUserData = await this.customer.update({
      where: {
        id: customerId
      },
      data: {
        ...customerData
      }
    })
    return updateUserData
  }

  public async deleteCustomer(customerId: string): Promise<Customer> {
    const findCustomer: Customer = await this.customer.findUnique({ where: { id: customerId } })
    if (!findCustomer) throw new HttpException(409, "User doesn't exist")

    const deleteCustomerData = await this.customer.delete({ where: { id: customerId } })
    return deleteCustomerData
  }
}
