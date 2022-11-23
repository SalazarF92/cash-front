import { errorMessages } from "@/helpers/messages";
import { ITransaction } from "@/interfaces/transaction";
import { get, post } from "./api";

interface Filter {
  ids?: string[];
  offset?: number;
  limit?: number;
}

class TransactionService {
  async get(type: string, query: Filter) {
    const { data } = await get<ITransaction[]>(
      `/transaction/list?type=${type}`,
      query
    );
    return data as ITransaction[];
  }

  async create(
    debitedAccount: string,
    creditedAccount: string,
    amount: number
  ) {
    try {
      const { data } = await post("/transaction/create", {
        debitedAccount,
        creditedAccount,
        value: amount,
      });
      return data;
    } catch (error) {
      return errorMessages(error.response.data.message);
    }
  }
}

export const transactionService = new TransactionService();
