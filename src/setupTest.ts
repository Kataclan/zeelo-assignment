import "@testing-library/jest-dom";
import "whatwg-fetch";

import { act } from "react-dom/test-utils";
import { mswServer } from "./__mocks__/msw-server";

// Use MSW before each test.
// Note: if there are not too many tests, it might be better to use mws in each test.

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

// Sleep helper function.
export const sleep = async (ms: number = 0) =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  });
