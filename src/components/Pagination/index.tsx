import { ArrowLeft, ArrowRight } from "iconoir-react";
import { useEffect, useState } from "react";

interface Props {
  total: number;
  perPage?: number;
  buttons?: boolean;
  onPageClick: (page: number) => void;
}

export default function Pagination(props: Props) {
  const { total, perPage = 15, buttons = true, onPageClick } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [total]);

  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => start + i);
  };

  return (
    <div className="flex items-center flex-wrap justify-center m-auto py-1">
      {buttons && (
        <button
          className="flex items-center px-2 m-1 h-8 rounded-lg transition-colors bg-accent hover:bg-accent2 disabled:cursor-not-allowed disabled:bg-accent/30 disabled:dark:bg-accent2"
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            onPageClick(currentPage - 1);
          }}
        >
          <ArrowLeft />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}
      {range(1, Math.ceil(total / perPage)).map((number, index) => (
        <button
          className={`
            "flex items-center justify-center w-min min-w-[2rem] h-8 p-2 m-1 font-medium cursor-pointer rounded-full transition-colors",
            number === currentPage && "bg-primary text-white",
            number !== currentPage && "hover:bg-accent"`}
          key={index}
          onClick={() => {
            onPageClick(number);
            setCurrentPage(number);
          }}
        >
          {number}
        </button>
      ))}
      {buttons && (
        <button
          className="flex items-center px-2 m-1 h-8 rounded-lg transition-colors bg-accent hover:bg-accent2 disabled:cursor-not-allowed disabled:bg-accent/30 disabled:dark:bg-accent2"
          disabled={currentPage === Math.ceil(total / perPage)}
          onClick={() => {
            onPageClick(currentPage + 1);
            setCurrentPage(currentPage + 1);
          }}
        >
          <span className="text-sm font-medium">Next</span>
          <ArrowRight />
        </button>
      )}
    </div>
  );
}
