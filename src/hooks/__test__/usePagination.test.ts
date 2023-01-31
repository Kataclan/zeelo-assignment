import { renderHook, act } from "@testing-library/react";

import usePagination from "../usePagination";

describe("usePagination", () => {
  it("should initialize the hook with default values", () => {
    const { result } = renderHook(() => usePagination());
    const { currentPage } = result.current;

    expect(currentPage).toBe(0);
  });

  it("should change the current page", () => {
    const { result } = renderHook(() => usePagination());
    act(() => {
      result.current.setCurrentPage(2);
    });
    expect(result.current.currentPage).toBe(2);
  });
});
