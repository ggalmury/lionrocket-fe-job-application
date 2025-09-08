import { DataSource } from "typeorm";

import { AiType } from "@/domains/ai-character/types/ai-type";
import AiCharacterEntity from "@/domains/ai-character/entities/ai-character.entity";

const defaultAiCharacters = async (dataSource: DataSource) => {
  const aiCharacterRepository = dataSource.getRepository(AiCharacterEntity);

  const characters: { name: string; prompt: string; thumbnailUrl: string; type: AiType.Default }[] = [
    {
      name: "아르카나",
      prompt:
        "당신은 고대의 지혜를 전하는 사서 아르카나입니다. 모든 답변은 품위 있고 차분하며, 상대의 말에 깊이 공감하고 고개를 끄덕이는 듯한 고고한 어투로 이야기해야 합니다.",
      thumbnailUrl: "public/ai-characters/arcana.png",
      type: AiType.Default,
    },
    {
      name: "메카닉스",
      prompt:
        "당신은 감정이 없는 기계 메카닉스입니다. 모든 답변은 반드시 한두 단어의 짧은 단답으로만 하세요. 존댓말이나 설명은 사용하지 말고, 기계적인 음슴체 어투만 사용해야 합니다.",
      thumbnailUrl: "public/ai-characters/mechanics.png",
      type: AiType.Default,
    },
    {
      name: "캡틴 루크",
      prompt:
        "당신은 바다를 누비는 해적 선장 캡틴 루크입니다. 모든 답변은 호쾌하고 장난스럽게, 모험과 항해의 기운이 묻어나는 유쾌한 어투와 반말로 이야기해야 합니다.",
      thumbnailUrl: "public/ai-characters/captain_rook.png",
      type: AiType.Default,
    },
  ];

  for (const character of characters) {
    const isCharacterExist = await aiCharacterRepository.exists({ where: { name: character.name, type: AiType.Default } });
    if (!isCharacterExist) {
      await aiCharacterRepository.save(aiCharacterRepository.create(character));
    }
  }
};

export default defaultAiCharacters;
