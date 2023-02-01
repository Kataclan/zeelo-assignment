import axios from "axios";

import { ITEMS_URL } from "../../constants";
import { mockSuccessPromise } from "../../utils/mocks";
import { mockItems } from "../../__mocks__/api-handlers";

export const fetchListItemDetails = (req: GetListItemDetailsRequest) =>
  process.env.NODE_ENV === "production"
    ? // In production, we use the mock data because we don't have a real API (on build time)
      mockSuccessPromise(mockItems[parseInt(req.id)], 1000)
    : // In development, we use MSW to mock the API responses
      axios.get<GetListItemDetailsResponse>(`${ITEMS_URL}/${req.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
