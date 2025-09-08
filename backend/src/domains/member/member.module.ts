import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import MemberEntity from "@/domains/member/entities/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [],
  exports: [],
})
export default class MemberModule {}
