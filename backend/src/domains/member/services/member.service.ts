import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import CryptoService from "@/crypto/services/crypto.service";

import MemberEntity from "@/domains/member/entities/member.entity";

@Injectable()
export default class MemberService {
  constructor(
    private readonly cryptoService: CryptoService,
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async findById(id: number): Promise<MemberEntity> {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) {
      throw new NotFoundException(`Member with id [${id}] not found`);
    }

    return member;
  }

  async findByAccount(accountId: string, password: string): Promise<MemberEntity> {
    const encryptedPassword = await this.cryptoService.hash(password);

    const member = await this.memberRepository.findOneBy({ accountId, encryptedPassword });
    if (!member) {
      throw new NotFoundException(`Member with accountId [${accountId}] not found`);
    }

    return member;
  }

  async create(accountId: string, password: string): Promise<MemberEntity> {
    const isDuplicateAccountId = await this.isDuplicateAccountId(accountId);
    if (isDuplicateAccountId) {
      throw new ConflictException(`Member accountId [${accountId}] is already in use.`);
    }

    const encryptedPassword = await this.cryptoService.hash(password);

    const createdMember = this.memberRepository.create({
      accountId,
      encryptedPassword,
    });

    return this.memberRepository.save(createdMember);
  }

  private async isDuplicateAccountId(accountId: string): Promise<boolean> {
    return this.memberRepository.exists({ where: { accountId } });
  }
}
