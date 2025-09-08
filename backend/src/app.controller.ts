import { Controller, Get } from "@nestjs/common";

@Controller()
export default class AppController {
  @Get()
  ping(): string {
    return "ping";
  }
}
