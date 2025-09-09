import { Controller, UseGuards, HttpCode, Get, Post, Body } from "@nestjs/common";

import JwtAccessTokenGuard from "@/domains/auth/guards/jwt-access-token.guard";
import AuthService from "@/domains/auth/services/auth.service";
import SignInReqDto from "@/domains/auth/dtos/sign-in-req.dto";
import SignUpReqDto from "@/domains/auth/dtos/sign-up-req.dto";
import SignInResDto from "@/domains/auth/dtos/sign-in-res.dto";
import SignUpResDto from "@/domains/auth/dtos/sign-up-res.dto";

@Controller("auth")
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("status")
  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(204)
  async status(): Promise<void> {
    return;
  }

  @Post("sign-in")
  @HttpCode(200)
  async signIn(@Body() body: SignInReqDto): Promise<SignInResDto> {
    const accessToken = await this.authService.signIn(body);

    return { accessToken };
  }

  @Post("sign-up")
  @HttpCode(201)
  async signUp(@Body() body: SignUpReqDto): Promise<SignUpResDto> {
    const { member, accessToken } = await this.authService.signUp(body);
    const { id, accountId } = member;

    return { id, accountId, accessToken };
  }
}
