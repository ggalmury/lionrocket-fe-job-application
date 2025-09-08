import { Module } from "@nestjs/common";

import CryptoService from "@/crypto/services/crypto.service";

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
})
export default class CryptoModule {}
