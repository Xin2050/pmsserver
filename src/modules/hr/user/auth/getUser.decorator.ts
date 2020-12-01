import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user.entity';
import { FontUser } from '../dto/FontUser';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    const user = { ...req.user.user };
    user.password = 'Blocked';
    return user;
  },
);
export const GetValidatedToken = createParamDecorator(
  (data, ctx: ExecutionContext): FontUser => {
    const req = ctx.switchToHttp().getRequest();
    const vtk = { ...req.user };

    const fontUser:FontUser = {
      cName:req.user.user.cName,
      eName:req.user.user.eName,
      email:req.user.user.email,
      uid:req.user.user.uid,
    }
    vtk.user = fontUser;
    return vtk;
  },
);
export const GetUserID = createParamDecorator(
  (data, ctx: ExecutionContext): string =>
    ctx.switchToHttp().getRequest().user.user.id,
);
export const GetGQLUserID = createParamDecorator(
  (data, ctx): void => GqlExecutionContext.create(ctx).getContext().req.user.user.id,
  //GqlExecutionContext.create(ctx).getContext().req
);


