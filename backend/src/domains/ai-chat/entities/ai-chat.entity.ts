import { Entity, Column, ManyToOne, JoinColumn, RelationId } from "typeorm";

import TypeOrmBaseOrmEntity from "@/shared/entities/typeorm-base.entity";

import MemberEntity from "@/domains/member/entities/member.entity";

import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";
import { ChatterRole } from "@/domains/ai-chat/types/chatter-role";

@Entity({ name: "ai_chats" })
export default class AiChatEntity extends TypeOrmBaseOrmEntity {
  @Column({ type: "varchar" })
  role: ChatterRole;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => MemberEntity, (member) => member.chats, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "member_id" })
  member: MemberEntity;

  @ManyToOne(() => AiCharacterEntity, (character) => character.chats, { nullable: false, onDelete: "RESTRICT" })
  @JoinColumn({ name: "ai_character_id" })
  character: AiCharacterEntity;
}
