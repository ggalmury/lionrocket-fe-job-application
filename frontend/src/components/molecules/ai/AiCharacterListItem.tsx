import clsx from "clsx";

import { SERVER_URL } from "@/lib/constants/url";

import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

import ImageBox from "@/components/atoms/ImageBox";
import Body1 from "@/components/atoms/typography/Body1";
import Caption2 from "@/components/atoms/typography/Caption2";

interface CharacterListItemProps {
  aiCharacter: AiCharacter;
  selected: boolean;
  onClick?: (id: number) => void;
}

const AiCharacterListItem = ({ aiCharacter, selected = false, onClick }: CharacterListItemProps) => {
  const { id, name, prompt, thumbnailUrl, type } = aiCharacter;

  return (
    <button
      className={clsx("flex items-center w-full gap-3 p-2 rounded-xl transition", selected && "border border-primary-600")}
      onClick={() => onClick?.(id)}
    >
      <div className="relative size-12 shrink-0 rounded-lg bg-gray-200 overflow-hidden">
        <ImageBox src={SERVER_URL + thumbnailUrl} alt={name} size="size-12" />
        <div className="absolute bottom-0 inset-x-0 bg-black/40 leading-4 pointer-events-none ">
          <Caption2 text={type === "custom" ? "커스텀" : "기본"} styles={{ color: "text-white" }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col text-left">
        <Body1 text={name} />
        <Caption2 text={prompt} styles={{ className: "line-clamp-1" }} />
      </div>
    </button>
  );
};

export default AiCharacterListItem;
