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
            onClick={() => handleClickPage(i)}
            disabled={i === currentPage}
          >
            {i + 1}
          </button>
        )),
    [totalPages, currentPage]
  );

  return <div>{buttons}</div>;
};

export default Paginator;
