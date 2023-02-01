import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import App from "./App";
import { DEFAULT_LIST_ITEMS_PER_PAGE } from "./constants";
import { sleep } from "./setupTest";
import { mockItems } from "./__mocks__/api-handlers";
import { mswServer } from "./__mocks__/msw-server";

describe("App", () => {
  beforeAll(() => mswServer.listen());
  afterEach(() => mswServer.resetHandlers());
  afterAll(() => mswServer.close());

  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    expect(getByText(/Zeelo Assignment/)).toBeInTheDocument();
  });

  it("shows 5 skeleton items at mount", async () => {
    render(<App />);
    expect(screen.getAllByText("Loading...").length).toBe(
      DEFAULT_LIST_ITEMS_PER_PAGE
    );
  });

  it("shows 5 skeleton items at mount and then the first 5 items", async () => {
    act(() => {
      render(<App />);
    });
    // We need to wait for MSW to respond with the mocked data (see /api-mocks/items/handlers.ts)
    await sleep(1000);
    mockItems.slice(0, DEFAULT_LIST_ITEMS_PER_PAGE).forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("shows second page items when clicking page 2 button", async () => {
    act(() => {
      render(<App />);
    });
    // We need to wait for MSW to respond with the mocked data (see /api-mocks/items/handlers.ts)
    await sleep(1000);
    const button = screen.getByRole("button", { name: "2" });
    act(() => {
      button.click();
    });
    expect(screen.getAllByText("Loading...").length).toBe(
      DEFAULT_LIST_ITEMS_PER_PAGE
    );
    await sleep(1200);
    // We need to wait for MSW to respond with the mocked data (see /api-mocks/items/handlers.ts)w
    mockItems
      .slice(DEFAULT_LIST_ITEMS_PER_PAGE, DEFAULT_LIST_ITEMS_PER_PAGE * 2)
      .forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
  });
});
