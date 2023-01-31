import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import ListItem from ".";

const item = {
  id: "1",
  title: "Book 1",
  link: "/api/v1/items/1",
  details: [
    { name: "author", value: "Author 1" },
    { name: "price", value: 20.99 },
    {
      name: "image",
      value: "https://example.com",
    },
  ],
};

describe("ListItem", () => {
  it("should render item title", () => {
    const { getByText } = render(<ListItem item={item} />);
    expect(getByText(item.title)).toBeInTheDocument();
  });

  it("should call onClick prop method when click on details button", () => {
    const onClick = jest.fn();
    const { getByRole } = render(<ListItem item={item} onClick={onClick} />);
    const detailsButton = getByRole("button", { name: "Details" });
    act(() => {
      detailsButton.click();
    });
    expect(onClick).toBeCalled();
  });

  it("should render item details when show details is true", () => {
    const { getByRole, getByText } = render(<ListItem item={item} selected />);
    item.details?.forEach((detail) => {
      expect(getByText(`${detail.name} : ${detail.value}`)).toBeInTheDocument();
    });
  });

  it("should hide details when clicking Details button twice", () => {
    const { getByRole, queryByText } = render(<ListItem item={item} />);
    const detailsButton = getByRole("button", { name: "Details" });
    act(() => {
      detailsButton.click();
    });
    act(() => {
      detailsButton.click();
    });
    item.details?.forEach((detail) => {
      expect(queryByText(`${detail.name} : ${detail.value}`)).toBe(null);
    });
  });
});
