import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl w-64 font-bold text-gray-500 text-center">
          Hello NGCasher!
        </h1>
        <Link
          className="text-2xl w-64 font-bold hover:underline hover:text-gray-100 text-gray-500 text-center"
          href="/transactions"
        >
          Go to Transactions!
        </Link>
      </div>
    </div>
  );
}
