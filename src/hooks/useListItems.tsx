import { useCallback, useEffect, useState } from "react";

import { fetchListItems } from "../api";
import { DEFAULT_LIST_ITEMS_PER_PAGE } from "../constants";

export default (page = 0) => {
  const [requestState, setRequestState] = useState<{
    items: ListItem[];
    loading: boolean;
    error: { msg: string } | null;
  }>({
    items: [],
    loading: true,
    error: null,
  });
  const [fetchedPages, setFetchedPages] = useState<number[]>([]);

  const { items, loading, error } = requestState;

  const fetchItems = useCallback(async () => {
    setRequestState({ ...requestState, loading: true });
    try {
      const response = await fetchListItems({
        offset: page * DEFAULT_LIST_ITEMS_PER_PAGE,
        count: DEFAULT_LIST_ITEMS_PER_PAGE,
      });
      // Merge new items with existing items
      const tmpItems = items;
      response.data.items.forEach((item: ListItem, i: number) => {
        tmpItems[page * DEFAULT_LIST_ITEMS_PER_PAGE + i] = item;
      });
      setRequestState({
        ...requestState,
        items: tmpItems,
        loading: false,
      });
      // Add page to fetchedPages to avoid fetching it again
      setFetchedPages([...fetchedPages, page]);
    } catch (err: any) {
      setRequestState({
        ...requestState,
        loading: false,
        error: { msg: err.msg },
      });
    }
  }, [items, fetchedPages, page]);

  // Fetch items on page change
  useEffect(() => {
    if (!fetchedPages.includes(page)) {
      fetchItems();
    }
  }, [page]);

  return { items, loading, error };
};
