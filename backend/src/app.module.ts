import { InternalServerErrorException, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import TypeOrmConfig from "@/config/typeorm.config";
import RedisModule from "@/cache/redis.module";
import CryptoModule from "@/crypto/crypto.module";
import MemberModule from "@/domains/member/member.module";
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
    RedisModule.forRoot(),
    CryptoModule,
    MemberModule,
  ],
  controllers: [AppController],
})
export default class AppModule {}
