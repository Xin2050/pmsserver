import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';
import {FontUser, UserRelationIds} from '../dto/FontUser';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return { ...req.user.user };
  },
);
export const GetUserRelationIds = createParamDecorator(
    (data,ctx:ExecutionContext): UserRelationIds =>{
        const user = ctx.switchToHttp().getRequest().user.user;
        const userRelationIds:UserRelationIds = {
            id:user.id,
            role:user.role,
            company:user.company,
        }
        return userRelationIds;
    }
)
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




