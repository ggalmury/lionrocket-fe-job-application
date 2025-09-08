import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { AccessTokenPayload } from "@/domains/auth/types/token.type";

@Injectable()
export default class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN_KEY"),
      expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXP"),
      issuer: this.configService.get<string>("JWT_ISSUER"),
    });
  }
}
