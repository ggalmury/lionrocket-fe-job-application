import { Module, OnApplicationBootstrap, InternalServerErrorException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";
import { join } from "path";

import defaultAiCharacters from "@/seeds/default-ai-characters";

import TypeOrmConfig from "@/config/typeorm.config";
import RedisModule from "@/cache/redis.module";
import CryptoModule from "@/crypto/crypto.module";
import AuthModule from "@/domains/auth/auth.module";
import MemberModule from "@/domains/member/member.module";
import AiCharacterModule from "@/domains/ai-character/ai-character.module";
import AiChatModule from "@/domains/ai-chat/ai-chat.module";
import AppController from "@/app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === "production" ? ".env.producton" : ".env.development",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
      async dataSourceFactory(options) {
        if (!options) {
          throw new InternalServerErrorException();
        }

        const datasource = new DataSource(options);

        return addTransactionalDataSource(datasource);
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public", "ai-characters"),
      serveRoot: "/public/ai-characters", // http://localhost:3000/public/ai-characters/...
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "uploads", "ai-characters"),
      serveRoot: "/uploads/ai-characters", // http://localhost:3000/uploads/ai-characters/...
    }),
    RedisModule.forRoot(),
    CryptoModule,
    AuthModule,
    MemberModule,
    AiCharacterModule,
    AiChatModule,
  ],
  controllers: [AppController],
})
export default class AppModule implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    await defaultAiCharacters(this.dataSource);
  }
}
