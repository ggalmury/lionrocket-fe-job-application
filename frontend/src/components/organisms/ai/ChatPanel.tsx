import { useEffect, useMemo, useRef, useState } from "react";

import { SERVER_URL } from "@/lib/constants/url";
import { formatDateToYMDHM } from "@/lib/utils/formatter/date";

import useAiChats from "@/domains/ai-chat/hooks/useAiChats";
import useSendChat from "@/domains/ai-chat/hooks/useSendChat";
import type { AiCharacter } from "@/domains/ai-character/models/aiCharacter";

import ImageBox from "@/components/atoms/ImageBox";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import Headline1 from "@/components/atoms/typography/Headline1";
import Body1 from "@/components/atoms/typography/Body1";
import Label1 from "@/components/atoms/typography/Label1";
import clsx from "clsx";
import Caption1 from "@/components/atoms/typography/Caption1";
import TextInput from "@/components/atoms/input/TextInput";

interface ChatPanelProps {
  aiCharacter: AiCharacter;
}

const ChatPanel = ({ aiCharacter }: ChatPanelProps) => {
  const { id, name, thumbnailUrl } = aiCharacter;

  const [draft, setDraft] = useState("");
  const { data: aiChats, isLoading } = useAiChats(id);
  const { mutate: sendChat, isPending } = useSendChat();

  const chats = useMemo(() => aiChats?.chats ?? [], [aiChats]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    el.scrollTop = el.scrollHeight;
  }, [chats.length]);

  const handleSend = (): void => {
    const content = draft.trim();
    if (!content) {
      return;
    }

    setDraft("");
    sendChat({ aiCharacterId: id, content });
  };

  return (
    <section className="flex-1 flex flex-col min-h-0 h-full">
      <div className="flex items-center h-14 px-5 gap-3 border-b border-slate-200">
        <ImageBox src={SERVER_URL + thumbnailUrl} alt={name} size="size-10" />
        <Label1 text={name} />
      </div>

      <div className="flex-1 p-5 overflow-auto" ref={scrollRef}>
        {!isLoading && chats.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <Headline1 text="대화를 시작해 보세요" />
            <Body1 text="메시지를 입력하면 여기에서 대화가 표시돼요" styles={{ color: "text-gray-400" }} />
          </div>
        ) : (
          <div className="flex flex-col">
            <ul className="flex flex-col gap-3">
              {chats.map((chat, index) => {
                const { role, content, createdAt } = chat;

                const isUser = role === "user";
                const date = formatDateToYMDHM(createdAt);

                return (
                  <li key={`${name}-${index}`} className={clsx("flex flex-col gap-1", isUser ? "self-end" : "self-start")}>
                    <div className={clsx("max-w-md rounded-2xl px-4 py-3", isUser ? "bg-primary-600" : "bg-green-500")}>
                      <Body1 text={content} styles={{ color: "text-white" }} />
                    </div>
                    <div className={clsx(isUser ? "text-right" : "text-left")}>
                      <Caption1 text={date} styles={{ color: "text-gray-400" }} />
                    </div>
                  </li>
                );
              })}
              {isPending && (
                <li className="self-start max-w-sm rounded-2xl px-4 py-3 bg-green-500">
                  <Body1 text="상대가 입력 중…" styles={{ color: "text-white" }} />
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 p-4 border-t border-gray-200">
        <TextInput placeholder="메시지를 입력해 주세요" value={draft} onChange={setDraft} />
        <PrimaryButton label="전송" styles={{ width: "w-auto", height: "h-11" }} onClick={handleSend} disabled={isPending} />
      </div>
    </section>
  );
};

export default ChatPanel;
