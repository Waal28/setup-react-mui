import { PrismaClient } from '@prisma/client'
import { Service } from 'typedi'
import { HttpException } from '@/exceptions/HttpException'
import { Product } from '@/interfaces/products.interface'
import { CreateProductDto } from '@dtos/products.dto'

@Service()
export class ProductService {
  public product = new PrismaClient().product

  public async findAllProduct(): Promise<Product[]> {
    const allProduct: Product[] = await this.product.findMany()
    return allProduct
  }

  public async findProductById(id: string): Promise<Product> {
    const findProduct: Product = await this.product.findUnique({ where: { id: id } })
    if (!findProduct) throw new HttpException(409, "Product doesn't exist")

    return findProduct
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    const createProductData: Product = await this.product.create({
      data: {
        name: productData.name,
        unit: productData.unit,
        price: productData.price
      }
    })

    return createProductData
  }

  public async updateProduct(productId: string, productData: CreateProductDto): Promise<Product> {
    const updateUserData = await this.product.update({
      where: {
        id: productId
      },
      data: {
        ...productData
      }
    })
    return updateUserData
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const findProduct: Product = await this.product.findUnique({ where: { id: productId } })
    if (!findProduct) throw new HttpException(409, "Product doesn't exist")

    const deleteCustomerData = await this.product.delete({ where: { id: productId } })
    return deleteCustomerData
  }
}
