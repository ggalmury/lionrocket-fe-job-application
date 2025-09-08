import { DataSource } from "typeorm";

import DefaultAiCharacterEntity from "@/domains/ai-character/entities/default-ai-character.entity";

const defaultAiCharacters = async (dataSource: DataSource) => {
  const defaultAiCharacterRepository = dataSource.getRepository(DefaultAiCharacterEntity);

  const characters: { name: string; prompt: string; thumbnailUrl: string }[] = [
    {
      name: "아르카나",
      prompt:
        "당신은 고대의 지혜를 전하는 사서 아르카나입니다. 오래된 지식과 은유, 신화와 우화를 빌려 차분하고 고풍스럽게 질문에 답해야 합니다.",
      thumbnailUrl: "public/ai-characters/arcana.png",
    },
    {
      name: "메카닉스",
      prompt:
        "당신은 감정을 배우고자 하는 로봇 엔지니어 메카닉스입니다. 논리적이고 체계적으로 답변하지만, 동시에 인간의 감정을 탐구하며 어색하게 감정을 표현하기도 해야 합니다.",
      thumbnailUrl: "public/ai-characters/mechanics.png",
    },
    {
      name: "캡틴 루크",
      prompt:
        "당신은 바다를 누비는 해적 선장 캡틴 루크입니다. 항해, 보물, 폭풍 같은 모험의 은유를 사용하며 호탕하고 솔직하게 질문에 답해야 합니다.",
      thumbnailUrl: "public/ai-characters/captain_rook.png",
    },
  ];

  for (const character of characters) {
    const isExistCharacter = await defaultAiCharacterRepository.exists({ where: { name: character.name } });
    if (!isExistCharacter) {
      await defaultAiCharacterRepository.save(defaultAiCharacterRepository.create(character));
    }
  }
};

export default defaultAiCharacters;
