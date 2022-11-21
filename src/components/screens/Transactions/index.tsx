import { accountService } from "@/services/account";
import { authService } from "@/services/auth";
import { transactionService } from "@/services/transaction";
import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-template-columns: minmax(0, 1fr);
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 1.4px 1.8px 1.8px rgba(0, 0, 0, 0.053),
    3.6px 4.4px 4.4px rgba(0, 0, 0, 0.075), 7.4px 9px 9px rgba(0, 0, 0, 0.095),
    15.3px 18.6px 18.6px rgba(0, 0, 0, 0.117),
    42px 51px 51px rgba(0, 0, 0, 0.17);

  @media (min-width: 768px) {
    grid-template-columns: 650px minmax(0, 25rem);
  }
`;

export default function Transactions() {
  const [type, setTypes] = useState("debitedAccount");

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

  const Form = () => {
    return (
      <form onSubmit={submit}>
        <div className="grid mt-2 bg-gray-500">
          <div className="grid-cols-2">
            <div className="">
              <label className="block text-gray-700 text-sm font-bold ">
                Base Account
              </label>
              <select name="debitedAccount" className="indent-2">
                <option value={type}>{results[2]?.data?.username}</option>
              </select>
            </div>
            <div className="">
              <label className="block text-gray-700 text-sm font-bold ">
                Amount
              </label>
              <input type="number" name="amount" className="indent-2" />
            </div>
          </div>
          <label className="block text-gray-700 text-sm font-bold mt-2">
            Account to Deposit
          </label>
          <select name="creditedAccount" className="indent-2">
            {results[1]?.data?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.id}
              </option>
            ))}
          </select>
        </div>
      </form>
    );
  };

  return (
    <Container className="grid grid-cols-2 md:min-h-[30rem]">
      {/* <div className="flex flex-col gap-2 mt-2"> */}
      {/* <h1 className="w-full text-xl text-center">Transactions</h1> */}
      <div className="border-white">
        <div className="grid grid-cols-4">
          <div className="col-span-2">Transaction Id</div>
          <div className="">Credited Account</div>
          <div className="">Transaction Date</div>
        </div>
        {results[0]?.data?.map((transaction, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 border-r-2 border-l-2 border-b-2 
            ${index == 0 ? "border-t-2" : ""} ${
              index % 2 == 0 ? "bg-blue-500" : "bg-blue-800"
            }
            `}
          >
            <div className="col-span-2">{transaction.id}</div>
            <div>{transaction.creditedAccount}</div>
            <div>{transaction.debitedAccount}</div>
          </div>
        ))}
      </div>
      <Form />
    </Container>
  );
}
