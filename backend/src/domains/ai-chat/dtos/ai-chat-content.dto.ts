import { ChatterRole } from "@/domains/ai-chat/types/chatter-role";

export default class AiChatContentDto {
  readonly role: ChatterRole;
  readonly content: string;

  constructor(role: ChatterRole, content: string) {
    this.role = role;
    this.content = content;
  }
}
