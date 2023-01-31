import axios from "axios";

import { ITEMS_URL } from "../../constants";

export const fetchListItems = (req: GetListItemsRequest) =>
  axios.get<GetListItemsResponse>(ITEMS_URL, {
    method: "GET",
    params: { offset: req.offset.toString(), count: req.count.toString() },
    headers: { "Content-Type": "application/json" },
  });
