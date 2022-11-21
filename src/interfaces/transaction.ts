import { IBase } from "./base";

export interface ITransaction extends IBase {
  debitedAccount: string;
  creditedAccount: string;
  value: number;
}
