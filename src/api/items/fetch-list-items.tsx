import axios from "axios";

import { ITEMS_URL } from "../../constants";
import { mockSuccessPromise } from "../../utils/mocks";
import { mockItems } from "../../__mocks__/api-handlers";

export const fetchListItems = (req: GetListItemsRequest) =>
  process.env.NODE_ENV === "production"
    ? // In production, we use the mock data because we don't have a real API (on build time)
      mockSuccessPromise(
        mockItems.slice(0, 5).map((item) => ({
          title: item.title,
          id: item.id,
          link: `/api/v1/items/${item.id}`,
        })),
        1000
      ) // In development and test, we use MSW to mock the API responses
    : axios.get<GetListItemsResponse>(ITEMS_URL, {
        method: "GET",
        params: { offset: req.offset.toString(), count: req.count.toString() },
        headers: { "Content-Type": "application/json" },
      });
