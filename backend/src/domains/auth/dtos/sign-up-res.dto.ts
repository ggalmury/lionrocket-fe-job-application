export default class SignUpResDto {
  readonly id: number;
  readonly accountId: string;
  readonly accessToken: string;

  constructor(id: number, accountId: string, accessToken: string) {
    this.id = id;
    this.accountId = accountId;
    this.accessToken = accessToken;
  }
}
