import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import Label1 from "@/components/atoms/typography/Label1";
import AiCharacterListItem from "@/components/molecules/ai/AiCharacterListItem";

interface AiCharacterListProps {
  aiCharacters: AiCharacter[];
  selectedId: number | null;
  onSelect?: (id: number) => void;
  onCreateClick?: () => void;
}

const AiCharacterList = ({ aiCharacters, selectedId, onSelect, onCreateClick }: AiCharacterListProps) => {
  return (
    <aside className="w-xs h-full border-r border-gray-200">
      <div className="flex justify-between items-center h-14 px-4 border-b border-gray-200">
        <Label1 text="캐릭터" styles={{ weight: "font-bold" }} />
        <PrimaryButton label="새 캐릭터" styles={{ width: "w-auto", height: "h-9" }} onClick={onCreateClick} />
      </div>

      <ul className="flex flex-col gap-4 p-3 overflow-auto">
        {aiCharacters.map((aiCharacter, index) => (
          <li key={`${aiCharacter}-${index}`}>
            <AiCharacterListItem aiCharacter={aiCharacter} selected={selectedId === aiCharacter.id} onClick={onSelect} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AiCharacterList;
