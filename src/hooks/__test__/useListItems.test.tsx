import React from "react";
import { render, act } from "@testing-library/react";

import useListItems from "../useListItems";

import { sleep } from "../../setupTest";
import { fetchListItems } from "../../api";

// Mock our own api call functions
jest.mock("../../api/items", () => ({
  fetchListItems: jest.fn().mockResolvedValue({
    data: {
      items: [
        { id: "1", title: "Book 1" },
        { id: "2", title: "Book 2" },
      ],
    },
  }),
}));

// Create a helper component to test the hook
const TestComponent: React.FC<{ page: number }> = ({ page }) => {
  const { loading, error, items } = useListItems(page);
  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      {items.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

describe("useListItems hook", () => {
  it("fetches items on mount", async () => {
    const { findAllByText } = render(<TestComponent page={0} />);
    expect(await findAllByText(/Loading/)).toHaveLength(1);
    expect(fetchListItems).toHaveBeenCalled();
    await sleep();
    expect(await findAllByText("Book 1")).toHaveLength(1);
  });
});
