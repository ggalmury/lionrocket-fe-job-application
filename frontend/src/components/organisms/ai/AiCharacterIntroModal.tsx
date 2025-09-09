import { SERVER_URL } from "@/lib/constants/url";

import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

import ImageBox from "@/components/atoms/ImageBox";
import TertiaryButton from "@/components/atoms/button/TertiaryButton";
import Label1 from "@/components/atoms/typography/Label1";
import Body1 from "@/components/atoms/typography/Body1";
import Body2 from "@/components/atoms/typography/Body2";

interface AiCharacterIntroModalProps {
  aiCharacter?: AiCharacter;
  isOpen: boolean;
  onClose: () => void;
}

const AiCharacterIntroModal = ({ aiCharacter, isOpen, onClose }: AiCharacterIntroModalProps) => {
  if (!isOpen || !aiCharacter) return null;

  const { name, prompt, thumbnailUrl } = aiCharacter;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute flex flex-col justify-center items-center inset-0 p-6">
        <div className="flex flex-col gap-6 w-sm p-6 rounded-2xl bg-background shadow-lg">
          <div className="flex justify-between items-center">
            <Label1 text="캐릭터 소개" styles={{ weight: "font-bold" }} />
            <TertiaryButton label="닫기" styles={{ width: "w-auto" }} onClick={onClose} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ImageBox src={SERVER_URL + thumbnailUrl} alt={name} />
              <Body1 text={name} styles={{ weight: "font-bold" }} />
            </div>

            <div className="p-4 rounded-xl border border-gray-200">
              <Body2 text={prompt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCharacterIntroModal;
