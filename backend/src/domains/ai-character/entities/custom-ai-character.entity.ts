import { Entity, JoinColumn, ManyToOne } from "typeorm";

import MemberEntity from "@/domains/member/entities/member.entity";

import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";

@Entity({ name: "custom_ai_characters" })
export default class CustomAiCharacterEntity extends AiCharacterEntity {
  @ManyToOne(() => MemberEntity, (member) => member.customAiCharacters, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "member_id" })
  member: MemberEntity;
}
