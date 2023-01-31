import { useCallback, useEffect, useState } from "react";

import { createListItem, fetchListItemDetails, fetchListItems } from "../api";
import { DEFAULT_LIST_ITEMS_PER_PAGE } from "../constants";

// TODO : Change state to useReducer
export default (page = 0) => {
  const [requestState, setRequestState] = useState<{
    items: ListItem[];
    loading: boolean;
    loadingDetails: boolean;
    creatingItem: boolean;
    error: { msg: string } | null;
  }>({
    items: [],
    loading: true,
    loadingDetails: false,
    creatingItem: false,
    error: null,
  });
  const [fetchedPages, setFetchedPages] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  const { items, loading, error, loadingDetails, creatingItem } = requestState;

  const selectItem = useCallback((id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
    }
  }, []);

  const fetchItems = useCallback(async () => {
    setRequestState({ ...requestState, loading: true });
    try {
      const response = await fetchListItems({
        offset: page * DEFAULT_LIST_ITEMS_PER_PAGE,
        count: DEFAULT_LIST_ITEMS_PER_PAGE,
      });
      // Merge new items with existing items
      const tmpItems = items;
      response.data.forEach((item: ListItem, i: number) => {
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

  const fetchItemDetails = useCallback(async () => {
    // Fetch item details if not already fetched
    if (selectedItem && !selectedItem.details) {
      setRequestState({ ...requestState, loadingDetails: true });
      try {
        const response = await fetchListItemDetails({ id: selectedItem.id });
        // Add details to selected item
        const selectedItemWithDetails = {
          ...selectedItem,
          details: [
            { name: "author", value: response.data.author },
            { name: "price", value: response.data.price },
            { name: "image", value: response.data.image },
          ],
        };
        // Update items with new selected item
        const tmpItems = items;
        tmpItems[parseInt(selectedItem.id) - 1] = selectedItemWithDetails;
        setRequestState({
          ...requestState,
          items: tmpItems,
          loadingDetails: false,
        });
        // Update selected item
        setSelectedItem(selectedItemWithDetails);
      } catch (err: any) {
        setRequestState({
          ...requestState,
          error: { msg: err.msg },
          loadingDetails: false,
        });
      }
    }
  }, [selectedItem, items]);

  const createItem = useCallback(async (details: ListItemDetails) => {
    setRequestState({ ...requestState, creatingItem: true });
    try {
      const response = await createListItem(details);
      // TODO: Here I would add the new item to the items array, but I hardcoded the TOTAL number of items to 20 for the pagination to work
      setRequestState({
        ...requestState,
        creatingItem: false,
      });
    } catch (err: any) {
      setRequestState({
        ...requestState,
        creatingItem: false,
        error: { msg: err.msg },
      });
    }

    setRequestState({ ...requestState, loading: true });
  }, []);

  // Fetch items on page change
  useEffect(() => {
    if (!fetchedPages.includes(page)) {
      fetchItems();
    }
  }, [page]);

  // Fetch item details on item selection
  useEffect(() => {
    fetchItemDetails();
  }, [selectedItem]);

  return {
    items,
    loading,
    error,
    loadingDetails,
    selectItem,
    selectedItem,
    createItem,
    creatingItem,
  };
};
