import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import * as jsonwebtoken from 'jsonwebtoken'
import { UserRoleEnum } from '../../user/enum/user.enum'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const req =  ctx.getContext().req
    const token = req.headers?.authorization

    if (!token) new ForbiddenException()

    // @ts-ignore
    const { role } = jsonwebtoken.decode(token.slice(7))
    return role === UserRoleEnum.ADMIN
  }
}
