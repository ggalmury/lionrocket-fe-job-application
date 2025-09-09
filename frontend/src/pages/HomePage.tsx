import { useMemo, useState } from "react";

import useAiCharacters from "@/domains/ai-character/hooks/useAiCharacters";

import Page from "@/components/layouts/Page";
import AiCharacterList from "@/components/organisms/ai/AiCharacterList";
import ChatPanel from "@/components/organisms/ai/ChatPanel";
import CreateAiCharacterModal from "@/components/organisms/ai/CreateAiCharacterModal";
import AiCharacterIntroModal from "@/components/organisms/ai/AiCharacterIntroModal";
import Headline1 from "@/components/atoms/typography/Headline1";

const HomePage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAiCharacterintroModalOpen, setIsAiCharacterintroModalOpen] = useState(false);
  const [isAiCharacterCreateModalOpen, setIsAiCharacterCreateModalOpen] = useState(false);

  const { data: aiCharacters, isLoading } = useAiCharacters();

  const handleSelectAiCharacter = (id: number): void => {
    setSelectedId(id);
    setIsAiCharacterintroModalOpen(true);
  };

  const selectedAiCharacter = useMemo(() => aiCharacters?.find((aiCharacter) => selectedId === aiCharacter.id), [aiCharacters, selectedId]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Page flexDirection="row">
      <AiCharacterList
        aiCharacters={aiCharacters ?? []}
        selectedId={selectedId}
        onSelect={handleSelectAiCharacter}
        onCreateClick={() => setIsAiCharacterCreateModalOpen(true)}
      />

      {selectedAiCharacter ? (
        <ChatPanel aiCharacter={selectedAiCharacter} />
      ) : (
        <section className="flex-1 flex justify-center items-center h-full">
          <Headline1 text="캐릭터를 선택해 주세요." />
        </section>
      )}

      <CreateAiCharacterModal isOpen={isAiCharacterCreateModalOpen} onClose={() => setIsAiCharacterCreateModalOpen(false)} />

      <AiCharacterIntroModal
        aiCharacter={selectedAiCharacter}
        isOpen={isAiCharacterintroModalOpen}
        onClose={() => setIsAiCharacterintroModalOpen(false)}
      />
    </Page>
  );
};

export default HomePage;
