import { useState } from "react";
import { DEFAULT_LIST_ITEMS_PER_PAGE } from "../constants";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = (currentPage - 1) * DEFAULT_LIST_ITEMS_PER_PAGE;
  const endIndex = startIndex + DEFAULT_LIST_ITEMS_PER_PAGE;

  return {
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
  };
};

export default usePagination;
