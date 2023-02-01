import { render } from "@testing-library/react";

import { ItemsListPresentational as ItemsList } from ".";

const ITEMS = [
  {
    id: "1",
    title: "Book 1",
    link: "/api/v1/items/1",
  },
  {
    id: "2",
    title: "Book 2",
    link: "/api/v1/items/2",
  },
  {
    id: "3",
    title: "Book 3",
    link: "/api/v1/items/3",
  },
];

describe("ItemsList", () => {
  it("should render items when not loading", () => {
    const { getByText } = render(<ItemsList items={ITEMS} />);
    ITEMS.forEach((item) => {
      expect(getByText(item.title)).toBeInTheDocument();
    });
  });

  it("should render skeletonCount items if loading", () => {
    const { getAllByText } = render(
      <ItemsList items={[]} loading={true} skeletonCount={ITEMS.length} />
    );
    expect(getAllByText("Loading...").length).toBe(ITEMS.length);
  });

  it("should render error message if error and not loading", () => {
    const { getByText } = render(
      <ItemsList
        items={ITEMS}
        loading={false}
        error={"An error has occurred"}
      />
    );
    expect(getByText("An error has occurred")).toBeInTheDocument();
  });

  it("should render skeletonCount items if loading and error", () => {
    const { getAllByText } = render(
      <ItemsList
        items={[]}
        loading={true}
        error={"An error has occurred"}
        skeletonCount={ITEMS.length}
      />
    );
    expect(getAllByText("Loading...").length).toBe(ITEMS.length);
  });
});
