import { Entity, Column } from "typeorm";

import TypeOrmBaseOrmEntity from "@/shared/entities/typeorm-base.entity";

@Entity({ name: "members" })
export default class MemberEntity extends TypeOrmBaseOrmEntity {
  @Column({ type: "varchar", unique: true })
  accountId: string;

  @Column({ type: "varchar" })
  password: string;
}
