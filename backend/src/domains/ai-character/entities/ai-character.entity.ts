import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import TypeOrmBaseOrmEntity from "@/shared/entities/typeorm-base.entity";

import MemberEntity from "@/domains/member/entities/member.entity";

import AiChatEntity from "@/domains/ai-chat/entities/ai-chat.entity";

import { MAX_AI_CHARACTER_NAME_LENGTH } from "@/domains/ai-character/constants/constraint";
import { AiType } from "@/domains/ai-character/types/ai-type";

@Entity({ name: "ai_characters" })
export default class AiCharacterEntity extends TypeOrmBaseOrmEntity {
  @Column({ type: "varchar", length: MAX_AI_CHARACTER_NAME_LENGTH })
  name: string;

  @Column({ type: "text" })
  prompt: string;

  @Column({ type: "varchar" })
  thumbnailUrl: string;

  @Column({ type: "varchar" })
  type: AiType;

  @ManyToOne(() => MemberEntity, (member) => member.customAiCharacters, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "member_id" })
  member: MemberEntity | null;

  @OneToMany(() => AiChatEntity, (chat) => chat.character)
  chats: AiChatEntity[];
}
