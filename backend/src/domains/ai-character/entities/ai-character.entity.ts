import { Column } from "typeorm";

import TypeOrmBaseOrmEntity from "@/shared/entities/typeorm-base.entity";

export default abstract class AiCharacterEntity extends TypeOrmBaseOrmEntity {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  prompt: string;

  @Column({ type: "varchar" })
  thumbnailUrl: string;
}
