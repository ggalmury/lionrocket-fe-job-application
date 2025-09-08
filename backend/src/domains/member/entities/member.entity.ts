import { Entity, Column, OneToMany } from "typeorm";

import TypeOrmBaseOrmEntity from "@/shared/entities/typeorm-base.entity";

import AiChatEntity from "@/domains/ai-chat/entities/ai-chat.entity";

import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";

@Entity({ name: "members" })
export default class MemberEntity extends TypeOrmBaseOrmEntity {
  @Column({ type: "varchar", unique: true })
  accountId: string;

  @Column({ type: "varchar" })
  encryptedPassword: string;

  @OneToMany(() => AiCharacterEntity, (character) => character.member)
  customAiCharacters: AiCharacterEntity[];

  @OneToMany(() => AiChatEntity, (chat) => chat.member)
  chats: AiChatEntity[];
}
