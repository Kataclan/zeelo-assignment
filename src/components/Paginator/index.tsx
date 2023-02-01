import React, { useMemo } from "react";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onClickPage: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onClickPage,
}) => {
  const handleClickPage = (page: number) => {
    onClickPage(page);
  };

  const buttons = useMemo(
    () =>
      Array(totalPages)
        .fill(0)
        .map((v, i) => (
          <button
            key={i}
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 disabled:bg-slate-100"
            onClick={() => handleClickPage(i)}
            disabled={i === currentPage}
          >
            {i + 1}
          </button>
        )),
    [totalPages, currentPage]
  );

  return (
    <div className="w-full flex items-center justify-center space-x-3">
      {buttons}
    </div>
  );
};

export default Paginator;
