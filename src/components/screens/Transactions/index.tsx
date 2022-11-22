import Button from "@/components/Button";
import { formatAmount, formatDate, sortByDate } from "@/helpers/utils";
import { accountService } from "@/services/account";
import { authService } from "@/services/auth";
import { transactionService } from "@/services/transaction";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  const [type, setType] = useState("creditedAccount");
  const [disable, setDisable] = useState(false);
  const [messages, setMessages] = useState([]);
  const [order, setOrder] = useState("asc");

  const results = useQueries({
    queries: [
      {
        queryKey: ["transactions", [type, order]],
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

  const transactions = results[0]?.data;
  const ownerAccount = results[2]?.data;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disable) return;
    const amount = e.currentTarget.amount.value;
    const debitedAccount = e.currentTarget.debitedAccount.value;
    const creditedAccount = e.currentTarget.creditedAccount.value;

    setDisable(true);
    const data = await transactionService.create(
      debitedAccount,
      creditedAccount,
      amount
    );
    if (data?.errors) {
      setMessages(data?.errors);
      setDisable(false);
      return;
    }
    setDisable(false);
    window.location.reload();
  }

  const Form = () => {
    return (
      <form onSubmit={submit}>
        <div className="grid p-2">
          <span className="text-xl text-center mb-2">Transfer</span>
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
              defaultValue={ownerAccount?.accountId}
            >
              <option value={ownerAccount?.accountId}>
                {results[2]?.data?.username}
              </option>
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
              <option key={account?.id} value={account?.id}>
                {account?.username}
              </option>
            ))}
          </select>
          {messages ? (
            <div className="mt-2 gap-2 flex flex-col">
              {messages?.map((message, index) => (
                <div
                  onClick={() => setMessages(null)}
                  key={index}
                  className="text-sm text-red-500 cursor-pointer"
                >
                  {message}
                </div>
              ))}
            </div>
          ) : null}
          <div className="w-full flex justify-end mt-3">
            <Button text="Send" type="submit" />
          </div>
        </div>
      </form>
    );
  };

  const Filters = () => {
    return (
      <div className="grid p-2">
        <span className="text-center text-xl mb-2">Filter By</span>
        <div className="grid grid-cols-2 gap-5">
          <span className="">Transaction Type</span>
          <span className="">Date</span>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="indent-2 bg-[#2b2e46] rounded-md"
          >
            <option value="creditedAccount">Cash In</option>
            <option value="debitedAccount">Cash Out</option>
            <option value="all">All</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="indent-2 bg-[#2b2e46] rounded-md"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <Container className="grid grid-cols-2 md:min-h-[30rem]">
      <div className="">
        {transactions?.length > 0 ? (
          <div className="grid grid-cols-6">
            <div className="col-span-2 ml-2">Transaction Id</div>
            <div className="">Credited</div>
            <div className="">Debited</div>
            <div className="">Date</div>
            <div className="text-center">Amount</div>
          </div>
        ) : (
          <div className="w-full h-full border-gray-600 text-2xl flex items-center justify-center bg-transparent border-2">
            No transactions avaliable...
          </div>
        )}

        {transactions?.length > 0
          ? sortByDate(transactions, order)?.map((transaction, index) => (
              <div
                key={index}
                className={`grid grid-cols-6 border-gray-600 ${
                  ownerAccount?.accountId == transaction?.debitedAccount
                    ? "text-red-600"
                    : "text-green-600"
                } border-r-2 border-l-2 border-b-2 place-items-center
            ${index == 0 ? "border-t-2" : ""} ${
                  index % 2 == 0 ? "bg-[#10141c]" : "bg-[#2c374d]"
                }
            `}
              >
                <div className="col-span-2 ml-2">{transaction.id}</div>
                {transaction.creditedAccount == ownerAccount?.accountId && (
                  <>
                    <div>{transaction.creditedUser}</div>
                    <div>{transaction.debitedUser}</div>
                  </>
                )}
                {transaction.debitedAccount == ownerAccount?.accountId && (
                  <>
                    <div>{transaction.creditedUser}</div>
                    <div>{transaction.debitedUser}</div>
                  </>
                )}
                <div>{formatDate(String(transaction.createdAt))}</div>
                <div>{formatAmount(transaction.value)}</div>
              </div>
            ))
          : null}
      </div>
      <div className="">
        <div className="flex p-2 text-2xl justify-around">
          <span>Current Balance</span>
          <span
            className={`${
              ownerAccount?.account.balance > 0
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {formatAmount(ownerAccount?.account.balance)}
          </span>
        </div>
        <Form />
        <Filters />
      </div>
    </Container>
  );
}
