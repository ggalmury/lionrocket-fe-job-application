import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import MemberModule from "@/domains/member/member.module";

import JwtAccessTokenGuard from "@/domains/auth/guards/jwt-access-token.guard";
import { JwtAccessTokenStrategy } from "@/domains/auth/strategies/jwt-access-token.strategy";
import AuthController from "@/domains/auth/auth.controller";
import AuthService from "@/domains/auth/services/auth.service";
import TokenService from "@/domains/auth/services/token.service";

@Module({
  imports: [JwtModule.register({}), MemberModule],
  controllers: [AuthController],
  providers: [JwtAccessTokenGuard, JwtAccessTokenStrategy, AuthService, TokenService],
  exports: [JwtAccessTokenGuard],
})
export default class AuthModule {}
