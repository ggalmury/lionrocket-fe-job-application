import { createParamDecorator, UnauthorizedException } from "@nestjs/common";

const ExtractBearerToken = createParamDecorator((_, context): string => {
  const request = context.switchToHttp().getRequest<Request>();
  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    throw new UnauthorizedException("Authorization header is missing");
  }

  const parts: string[] = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new UnauthorizedException("Invalid auth token");
  }

  return parts[1];
});

export default ExtractBearerToken;
