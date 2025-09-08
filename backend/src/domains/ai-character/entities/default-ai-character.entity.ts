import { Entity } from "typeorm";

import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";

@Entity({ name: "default_ai_characters" })
export default class DefaultAiCharacterEntity extends AiCharacterEntity {}
