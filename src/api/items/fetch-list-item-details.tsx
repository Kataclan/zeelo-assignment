import axios from "axios";

import { ITEMS_URL } from "../../constants";

export const fetchListItemDetails = (req: GetListItemDetailsRequest) =>
  axios.get<GetListItemDetailsResponse>(`${ITEMS_URL}/${req.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
