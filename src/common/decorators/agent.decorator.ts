import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// CurrentUser decorator
export const Agent = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // get the request
    const request = context.switchToHttp().getRequest();

    //  return the user in the req.
    return request.agent;
  },
);
