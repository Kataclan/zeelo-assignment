import { rest } from "msw";

import ITEMS from "./data";

import { ITEMS_URL, DEFAULT_LIST_ITEMS_PER_PAGE } from "../../../constants";

// List Items endpoint
const getListItemsHandler = rest.get(ITEMS_URL, async (req, res, ctx) => {
  const offset = req.url.searchParams.get("offset");
  const count = req.url.searchParams.get("count");

  const o = offset ? parseInt(offset) : 0;
  const c = count ? parseInt(count) : DEFAULT_LIST_ITEMS_PER_PAGE;

  const items = ITEMS.slice(o, o + c).map((item) => ({
    id: item.id,
    title: item.title,
    link: `/api/v1/${item.id}`,
  }));
  return res(ctx.status(200), ctx.delay(1000), ctx.json(items));
});

const itemsHandlers = [getListItemsHandler];

export default itemsHandlers;
