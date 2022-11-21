import { accountService } from "@/services/account";
import { authService } from "@/services/auth";
import { transactionService } from "@/services/transaction";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  width: 480px;
  margin: 0 auto;
  padding: 20px;
  background-color: darkgray;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default function Transactions() {
  const [type, setTypes] = useState("creditedAccount");

  const results = useQueries({
    queries: [
      {
        queryKey: ["transactions", 1],
        queryFn: () => transactionService.get(type),
      },
      {
        queryKey: ["accounts", 2],
        queryFn: () => accountService.getAll(),
      },
      {
        queryKey: ["user", 3],
        queryFn: () => authService.me(),
      },
    ],
  });

  console.log(results);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Content>
      <div className="flex">
        <div className="">
          <h1>Transactions</h1>
          {results[0]?.data?.map((transaction) => (
            <div key={transaction.id}>{transaction.creditedAccount}</div>
          ))}
        </div>
        <div className="">
          <form onSubmit={submit}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Base Account
            </label>
            <select name="debitedAccount">
              <option value={type}>{results[2]?.data?.username}</option>
            </select>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Account to Deposit
            </label>
            <select name="creditedAccount">
              {results[1]?.data?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.id}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
    </Content>
  );
}
