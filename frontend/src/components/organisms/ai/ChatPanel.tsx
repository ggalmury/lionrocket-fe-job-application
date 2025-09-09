import SecondaryButton from "@/components/atoms/button/SecondaryButton";
import Body2 from "@/components/atoms/typography/Body2";
import PrimaryButton from "@/components/atoms/button/PrimaryButton";
import { useState } from "react";

export interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

export interface ChatPanelProps {
  name?: string;
  thumbnailUrl?: string;
  messages: Message[];
  onSend?: (text: string) => void;
}

const ChatPanel = ({ name, thumbnailUrl, messages, onSend }: ChatPanelProps) => {
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    if (!draft.trim()) return;
    onSend?.(draft.trim());
    setDraft("");
  };

  return (
    <section className="flex-1 h-full flex flex-col bg-white">
      {/* 상단 바: 새 대화 제거, 편집 제거 */}
      <div className="h-14 px-5 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-md bg-slate-200 overflow-hidden grid place-items-center">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt="썸네일" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[11px] text-slate-600">{name?.slice(0, 2)}</span>
            )}
          </div>
          <div>
            <div className="text-[14px] font-semibold text-slate-900">{name}</div>
            <div className="text-[12px] text-slate-500">대화는 데모 상태예요</div>
          </div>
        </div>
        <div className="flex gap-2">
          <SecondaryButton label="새 대화" styles={{ height: "h-9", width: "w-auto" }} disabled />
        </div>
      </div>

      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-auto p-5 bg-slate-50">
        {messages.length === 0 ? (
          <div className="h-full grid place-items-center">
            <div className="text-center">
              <div className="text-[15px] font-medium text-slate-800">대화를 시작해 보세요</div>
              <Body2 text="메시지를 입력하면 여기에서 대화가 표시돼요" styles={{ color: "text-slate-500" }} />
            </div>
          </div>
        ) : (
          <ul className="grid gap-3">
            {messages.map((m) => (
              <li key={m.id} className={m.role === "user" ? "justify-self-end" : "justify-self-start"}>
                <div
                  className={`max-w-[70ch] rounded-2xl px-4 py-3 ${
                    m.role === "user" ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-900"
                  }`}
                >
                  {m.text}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 h-11 rounded-xl border border-slate-300 bg-white px-3 text-[14px] outline-none transition focus:border-[#3182f6] focus:ring-4 focus:ring-[#9cc6ff]/40"
            placeholder="메시지를 입력해 주세요"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <PrimaryButton label="전송" styles={{ width: "w-auto", height: "h-11" }} onClick={handleSend} />
        </div>
      </div>
    </section>
  );
};

export default ChatPanel;

