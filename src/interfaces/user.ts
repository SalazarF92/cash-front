import { IBase } from "./base";

export interface IUser extends IBase {
  username: string;
  accountId: string;
  password: string;
}
