import { IAccount } from "@/interfaces/account";
import { get } from "./api";

class AccountService {
  async getAll() {
    const { data } = await get<IAccount[]>(`/account/list`);
    return data as IAccount[];
  }
}

export const accountService = new AccountService();
