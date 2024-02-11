import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '@config'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, RequestWithAdmin } from '@interfaces/auth.interface'

const getAuthorization = req => {
  const coockie = req.cookies['Authorization']
  if (coockie) return coockie

  const header = req.header('Authorization')
  if (header) return header.split('Bearer ')[1]

  return null
}

export const AuthMiddleware = async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req)

    if (Authorization) {
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken
      const admins = new PrismaClient().admin
      const findAdmin = await admins.findUnique({ where: { id: id } })

      if (findAdmin) {
        req.admin = findAdmin
        next()
      } else {
        next(new HttpException(401, 'Wrong authentication token'))
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'))
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'))
  }
}
