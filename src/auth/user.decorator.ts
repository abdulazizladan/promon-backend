import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  id: number; username: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const user = ctx.switchToHttp().getRequest().user;
    return user as AuthUser;
  },
);