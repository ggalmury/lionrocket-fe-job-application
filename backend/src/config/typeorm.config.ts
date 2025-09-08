import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategy";

@Injectable()
export default class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "sqlite",
      database: this.configService.get<string>("DB_DATABASE", "database.sqlite"),
      synchronize: this.configService.get<boolean>("DB_SYNCHRONIZE", false),
      entities: [__dirname + "/../../**/*-typeorm.entity{.ts,.js}"],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
