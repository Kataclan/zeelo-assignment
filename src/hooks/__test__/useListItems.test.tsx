import React from "react";
import { render, act } from "@testing-library/react";

import useListItems from "../useListItems";

import { sleep } from "../../setupTest";
import { fetchListItemDetails, fetchListItems } from "../../api";

// Mock our own api call functions
jest.mock("../../api/items", () => ({
  fetchListItems: jest.fn().mockResolvedValue({
    data: [
      { id: "1", title: "Book 1" },
      { id: "2", title: "Book 2" },
    ],
  }),
  fetchListItemDetails: jest.fn().mockResolvedValue({
    data: {
      author: "Author 1",
      price: "30.99",
      image: "https://example.com",
    },
  }),
}));

// Create a helper component to test the hook
const TestComponent: React.FC<{ page: number }> = ({ page }) => {
  const { loading, error, items, selectItem, selectedItem, loadingDetails } =
    useListItems(page);
  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>Error</p>}
      {items.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
      <button onClick={() => selectItem("1")}></button>
      {loadingDetails && <p>Loading details</p>}
      {selectedItem && selectedItem.details && (
        <div>
          {selectedItem.details!.map((detail) => (
            <div key={detail.name}>
              <span>{detail.name}</span>
              <span>{detail.value}</span>
            </div>
          ))}
        </div>
      )}
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
    expect(await findAllByText("Book 2")).toHaveLength(1);
  });

  it("fetches item details when selecting item", async () => {
    const { findAllByText, getByRole } = render(<TestComponent page={0} />);
    const selectButton = getByRole("button");
    await sleep();
    act(() => {
      selectButton.click();
    });
    expect(await findAllByText(/Loading details/)).toHaveLength(1);
    expect(fetchListItemDetails).toHaveBeenCalled();

    // Await details to be fetched
    await sleep();
    expect(await findAllByText(/author/)).toHaveLength(1);
    expect(await findAllByText(/Author 1/)).toHaveLength(1);

    expect(await findAllByText(/price/)).toHaveLength(1);
    expect(await findAllByText(/30.99/)).toHaveLength(1);

    expect(await findAllByText(/image/)).toHaveLength(1);
    expect(await findAllByText(/example.com/)).toHaveLength(1);
  });
});
