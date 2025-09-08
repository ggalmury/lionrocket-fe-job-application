import { Injectable } from "@nestjs/common";

import MemberService from "@/domains/member/services/member.service";
import MemberEntity from "@/domains/member/entities/member.entity";

import TokenService from "@/domains/auth/services/token.service";
import SignInReqDto from "@/domains/auth/dtos/sign-in-req.dto";
import SignUpReqDto from "@/domains/auth/dtos/sign-up-req.dto";

@Injectable()
export default class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly memberService: MemberService,
  ) {}

  async signIn(body: SignInReqDto): Promise<string> {
    const { accountId, password } = body;

    const member = await this.memberService.findByAccount(accountId, password);

    return this.tokenService.generateAccessToken({ id: member.id });
  }

  async signUp(body: SignUpReqDto): Promise<{ member: MemberEntity; accessToken: string }> {
    const { accountId, password } = body;

    const member = await this.memberService.create(accountId, password);
    const accessToken = this.tokenService.generateAccessToken({ id: member.id });

    return { member, accessToken };
  }
}
