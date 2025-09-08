import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

type AuthedRequest = Request & { user?: number };

const ExtractMemberId = createParamDecorator((_, context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest<AuthedRequest>();
  const userId = request.user;
  if (typeof userId !== "number") {
    throw new UnauthorizedException("Invalid member");
  }

  return userId;
});

export default ExtractMemberId;
