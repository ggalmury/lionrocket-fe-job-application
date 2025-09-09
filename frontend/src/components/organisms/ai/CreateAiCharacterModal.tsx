import { useMemo, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

import { parseFormData } from "@/lib/utils/parser/formdata";

import { MAX_AI_CHARACTER_NAME_LENGTH } from "@/domains/ai-character/constants/constraint";
import useCreateAiCharacter from "@/domains/ai-character/hooks/useCreateAiCharacter";
import type { AiCharacterForm } from "@/domains/ai-character/models/aiCharacterForm";

import ImageBox from "@/components/atoms/ImageBox";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import TertiaryButton from "@/components/atoms/button/TertiaryButton";
import TextInput from "@/components/atoms/input/TextInput";
import TextArea from "@/components/atoms/input/TextArea";
import Label1 from "@/components/atoms/typography/Label1";
import FormField from "@/components/molecules/FormField";

interface CreateAiCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAiCharacterModal = ({ isOpen, onClose }: CreateAiCharacterModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const thumbnailImagePreview = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file]);

  const { mutate: createAiCharacter } = useCreateAiCharacter({
    onSuccess: () => {
      toast.info("캐릭터가 생성되었어요.");
      onClose();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = parseFormData(e.currentTarget);
    const aiCharacterForm: AiCharacterForm = {
      name: formData["name"] as string,
      prompt: formData["prompt"] as string,
      thumbnailImage: formData["thumbnailImage"] as File,
    };

    createAiCharacter(aiCharacterForm);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute flex flex-col justify-center items-center inset-0 p-6">
        <div className="flex flex-col gap-6 w-sm p-6 rounded-2xl bg-background shadow-lg">
          <div className="flex justify-between items-center">
            <Label1 text="캐릭터 만들기" styles={{ weight: "font-bold" }} />
            <TertiaryButton label="닫기" styles={{ width: "w-auto" }} onClick={onClose} />
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <FormField label="이름">
              <TextInput name="name" placeholder="예) 루미" maxLength={MAX_AI_CHARACTER_NAME_LENGTH} />
            </FormField>

            <FormField label="프롬프트">
              <TextArea name="prompt" placeholder="캐릭터의 말투, 성격, 역할 등을 설명해 주세요" />
            </FormField>

            <FormField label="썸네일 이미지">
              <div className="flex items-center gap-3 overflow-hidden">
                <ImageBox src={thumbnailImagePreview} alt="캐릭터 이미지" />
                <input
                  name="thumbnailImage"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </FormField>

            <div className="flex gap-2">
              <TertiaryButton label="취소" onClick={onClose} />
              <PrimaryButton label="만들기" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAiCharacterModal;
