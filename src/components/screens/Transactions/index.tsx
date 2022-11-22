import Button from "@/components/Button";
import { accountService } from "@/services/account";
import { authService } from "@/services/auth";
import { transactionService } from "@/services/transaction";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-template-columns: minmax(0, 1fr);
  background-color: transparent;
  /* border-radius: 15px; */
  box-shadow: 1.4px 1.8px 1.8px rgba(0, 0, 0, 0.053),
    3.6px 4.4px 4.4px rgba(0, 0, 0, 0.075), 7.4px 9px 9px rgba(0, 0, 0, 0.095),
    15.3px 18.6px 18.6px rgba(0, 0, 0, 0.117),
    42px 51px 51px rgba(0, 0, 0, 0.17);

  @media (min-width: 768px) {
    grid-template-columns: 650px minmax(0, 25rem);
  }
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

  const transactions = results[0].data;
  const account = results[2].data;


  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const Form = () => {
    return (
      <form onSubmit={submit}>
        <div className="grid p-2">
          <span className="text-xl text-center">Transfer</span>
          <div className="grid grid-cols-3 gap-5">
            <label className="block col-span-2 text-gray-200 text-sm font-bold ">
              Base Account
            </label>
            <label className="block text-gray-200 text-sm font-bold ">
              Amount
            </label>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <select
              name="debitedAccount"
              className="col-span-2 indent-2 bg-[#2b2e46] rounded-md"
            >
              <option value={type}>{results[2]?.data?.username}</option>
            </select>
            <input
              type="number"
              name="amount"
              className="indent-2 bg-[#2b2e46] rounded-md"
            />
          </div>
          <label className="block text-gray-200 text-sm font-bold mt-2">
            Account to Deposit
          </label>
          <select
            name="creditedAccount"
            className="indent-2 bg-[#2b2e46] rounded-md"
          >
            {results[1]?.data?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.id}
              </option>
            ))}
          </select>
          <div className="w-full flex justify-end mt-3">
            <Button text="Send" type="submit" />
          </div>
        </div>
      </form>
    );
  };

  return (
    <Container className="grid grid-cols-2 md:min-h-[30rem]">
      <div className="">
        {transactions?.length > 0 ? (
          <div className="grid grid-cols-5">
            <div className="col-span-2">Transaction Id</div>
            <div className="">Credited Account</div>
            <div className="">Transaction Date</div>
            <div className="text-center">Amount</div>
          </div>
        ) : (
          <div className="w-full h-full border-gray-600 text-2xl flex items-center justify-center bg-transparent border-2">
            No transactions avaliable...
          </div>
        )}

        {transactions?.length > 0 ? (
          transactions?.map((transaction, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 border-gray-600 ${account.accountId == transaction.debitedAccount ? 'text-red-600' : 'text-green-600'} border-r-2 border-l-2 border-b-2 place-items-center
            ${index == 0 ? "border-t-2" : ""} ${
                index % 2 == 0 ? "bg-[#10141c]" : "bg-[#2c374d]"
              }
            `}
            >
              <div className="col-span-2">{transaction.id}</div>
              <div>{transaction.creditedAccount}</div>
              <div>{transaction.debitedAccount}</div>
              <div>{transaction.value}</div>
            </div>
          ))
        ) : (
          <div className="w-full text-2xl h-full flex items-center justify-center">
            No transactions avaliable...
          </div>
        )}
      </div>
      <Form />
    </Container>
  );
}
