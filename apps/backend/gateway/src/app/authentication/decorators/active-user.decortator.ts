import { User } from '@app/shared/entities';
import { REQUEST_USER_KEY } from '../constants/user-request';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ActiveUser = createParamDecorator(
  (field: keyof User | undefined, ctx: ExecutionContext) => {
    const grapqlContext: GqlExecutionContext = GqlExecutionContext.create(ctx);
    const request = grapqlContext.getContext().req;
    const user: User | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  }
);
