import { Entity, Column, OneToMany } from "typeorm";

import TypeOrmBaseOrmEntity from "@/shared/entities/typeorm-base.entity";

import CustomAiCharacterEntity from "@/domains/ai-character/entities/custom-ai-character.entity";

@Entity({ name: "members" })
export default class MemberEntity extends TypeOrmBaseOrmEntity {
  @Column({ type: "varchar", unique: true })
  accountId: string;

  @Column({ type: "varchar" })
  encryptedPassword: string;

  @OneToMany(() => CustomAiCharacterEntity, (character) => character.member)
  customAiCharacters: CustomAiCharacterEntity[];
}
