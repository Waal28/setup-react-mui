import { NextFunction, Request, Response } from 'express'
import { Container } from 'typedi'
import { RequestWithAdmin } from '@interfaces/auth.interface'
import { Admin } from '@/interfaces/admin.interface'
import { AuthService } from '@services/auth.service'

export class AuthController {
  public auth = Container.get(AuthService)

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const AdminData: Admin = req.body
      const { cookie, findAdmin } = await this.auth.login(AdminData)

      res.setHeader('Set-Cookie', [cookie])
      res.status(200).json({ data: findAdmin, message: 'login' })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (req: RequestWithAdmin, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminData: Admin = req.admin
      const logOutAdminData: Admin = await this.auth.logout(adminData)

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0'])
      res.status(200).json({ data: logOutAdminData, message: 'logout' })
    } catch (error) {
      next(error)
    }
  }
}
