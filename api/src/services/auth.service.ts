import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Service } from 'typedi'
import { SECRET_KEY } from '@config'
import { CreateAdminDto } from '@dtos/admin.dto'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { Admin } from '@/interfaces/admin.interface'

@Service()
export class AuthService {
  public admin = new PrismaClient().admin

  public async login(adminData: CreateAdminDto): Promise<{ cookie: string; findAdmin: Admin }> {
    const findAdmin: Admin = await this.admin.findUnique({ where: { email: adminData.email } })
    if (!findAdmin) throw new HttpException(409, `This email ${adminData.email} was not found`)

    const isPasswordMatching: boolean = await compare(adminData.password, findAdmin.password)
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching')

    const tokenData = this.createToken(findAdmin)
    const cookie = this.createCookie(tokenData)

    return { cookie, findAdmin }
  }

  public async logout(adminData: Admin): Promise<Admin> {
    const findAdmin: Admin = await this.admin.findFirst({ where: { email: adminData.email, password: adminData.password } })
    if (!findAdmin) throw new HttpException(409, "Admin doesn't exist")

    return findAdmin
  }

  public createToken(admin: Admin): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: admin.id }
    const secretKey: string = SECRET_KEY
    const expiresIn: number = 60 * 60

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) }
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
  }
}
