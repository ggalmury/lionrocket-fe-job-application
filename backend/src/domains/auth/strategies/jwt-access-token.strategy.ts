import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import MemberService from "@/domains/member/services/member.service";

import { AccessTokenPayload } from "@/domains/auth/types/token.type";

export const ACCESS_TOKEN_STRATEGY = "access-token-strategy";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY) {
  constructor(
    configService: ConfigService,
    private readonly memberService: MemberService,
  ) {
    super({
      secretOrKey: configService.getOrThrow<string>("ACCESS_TOKEN_KEY"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.getOrThrow<string>("JWT_ISSUER"),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<number> {
    const { id } = payload;

    const member = await this.memberService.findById(id);

    return member.id;
  }
}
