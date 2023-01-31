import axios from "axios";

import { ITEMS_URL } from "../../constants";

export const createListItem = (req: CreateListItemRequest) =>
  axios.get<CreateListItemRequest>(ITEMS_URL, {
    method: "GET",
    params: { ...req, price: req.price.toString() },
    headers: { "Content-Type": "application/json" },
  });
