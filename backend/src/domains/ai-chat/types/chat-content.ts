import { ChatterRole } from "@/domains/ai-chat/types/chatter-role";

export default interface ChatContent {
  role: ChatterRole;
  content: string;
  createdAt: Date;
}
