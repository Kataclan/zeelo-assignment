import { render, fireEvent } from "@testing-library/react";

import { CreateItemFormPresentational as CreateItemForm } from "./";
import { act } from "react-dom/test-utils";

const onSubmit = jest.fn();

describe("CreateItemForm", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it("submits form correctly", async () => {
    const { getByLabelText, getByText } = render(
      <CreateItemForm onSubmit={onSubmit} />
    );

    const titleInput = getByLabelText("Title");
    const authorInput = getByLabelText("Author");
    const priceInput = getByLabelText("Price");
    const imageInput = getByLabelText("Image");
    const submitBtn = getByText("Create");

    await act(async () => {
      fireEvent.change(titleInput, {
        target: { value: "Book 1" },
      });
      fireEvent.change(authorInput, { target: { value: "Author 1" } });
      fireEvent.change(priceInput, { target: { value: "30.99" } });
      fireEvent.change(imageInput, {
        target: { value: "https://example.com/" },
      });
      fireEvent.click(submitBtn);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Book 1",
      author: "Author 1",
      price: 30.99,
      image: "https://example.com/",
    });
  });
});
