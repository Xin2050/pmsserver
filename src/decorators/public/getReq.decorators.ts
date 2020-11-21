import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetGQLRes = createParamDecorator(
  (data, ctx): Response => GqlExecutionContext.create(ctx).getContext().req.res,
);

export const GetReq = createParamDecorator(
  (data, ctx: ExecutionContext): Response => ctx.switchToHttp().getRequest(),
);

export const GetRes = createParamDecorator(
  (data, ctx: ExecutionContext): Response => ctx.switchToHttp().getResponse(),
);
