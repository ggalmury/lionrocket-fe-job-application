import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import CryptoModule from "@/crypto/crypto.module";

import MemberService from "@/domains/member/services/member.service";
import MemberEntity from "@/domains/member/entities/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity]), CryptoModule],
  providers: [MemberService],
  exports: [MemberService],
})
export default class MemberModule {}
