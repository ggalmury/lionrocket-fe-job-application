import { IsNotEmpty, IsString } from "class-validator";

export default class SignInReqDto {
  @IsNotEmpty()
  @IsString()
  readonly accountId: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  constructor(accountId: string, password: string) {
    this.accountId = accountId;
    this.password = password;
  }
}
