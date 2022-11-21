import { ITransaction } from "@/interfaces/transaction";
import { get, post } from "./api";

class TransactionService {
  async get(type: string) {
    const { data } = await get<ITransaction[]>(`/transaction/list?type=${type}`);
    return data as ITransaction[];
  }

  async create(debitedAccount: string, creditedAccount: string, amount: number) {
    const { data } = await post("/transaction/create", {
      debitedAccount,
      creditedAccount,
      amount,
    });
    return data;
  }
}

export const transactionService = new TransactionService();
