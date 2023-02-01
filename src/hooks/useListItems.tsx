import { useCallback, useEffect, useState } from "react";

import { createListItem, fetchListItemDetails, fetchListItems } from "../api";
import { DEFAULT_LIST_ITEMS_PER_PAGE } from "../constants";

// TODO : Change state to useReducer
export default (page = 0, itemId = "") => {
  const [requestState, setRequestState] = useState<{
    items: ListItem[];
    loading: boolean;
    loadingDetails: boolean;
    error: { msg: string } | null;
    fetchedPages: number[];
  }>({
    items: [],
    loading: true,
    loadingDetails: false,
    error: null,
    fetchedPages: [],
  });
  const [selectedItemId, setSelectedItemId] = useState<string>(itemId);

  const { items, loading, error, loadingDetails, fetchedPages } = requestState;
  const selectedItem = items.find((item) => item.id === selectedItemId);

  const selectItem = (itemId: string) => {
    console.log(
      "selectItem",
      itemId,
      selectedItemId,
      itemId === selectedItemId
    );
    if (selectedItemId === itemId) {
      setSelectedItemId("");
    } else {
      setSelectedItemId(itemId);
    }
  };

  const fetchItems = useCallback(async () => {
    setRequestState({ ...requestState, loading: true });
    try {
      const response = await fetchListItems({
        offset: page * DEFAULT_LIST_ITEMS_PER_PAGE,
        count: DEFAULT_LIST_ITEMS_PER_PAGE,
      });
      // Merge new items with existing items
      const tmpItems = items;
      response?.data.forEach((item: ListItem, i: number) => {
        tmpItems[page * DEFAULT_LIST_ITEMS_PER_PAGE + i] = item;
      });
      setRequestState({
        ...requestState,
        items: tmpItems,
        loading: false,
        fetchedPages: [...fetchedPages, page],
      });
      // Add page to fetchedPages to avoid fetching it again
    } catch (err: any) {
      setRequestState({
        ...requestState,
        loading: false,
        error: { msg: err.msg },
      });
    }
  }, [items, page]);

  const fetchItemDetails = useCallback(
    async (itemId: string) => {
      // Fetch item details if not already fetched
      const currentItem = items.find((item) => item.id === itemId);
      if (currentItem && !currentItem.details) {
        setRequestState({
          ...requestState,
          loading: false,
          loadingDetails: true,
        });
        try {
          const response = await fetchListItemDetails({ id: currentItem.id });
          // Add details to selected item
          const itemWithDetails = {
            ...currentItem,
            details: [
              { name: "author", value: response.data.author },
              { name: "price", value: response.data.price },
              { name: "image", value: response.data.image },
            ],
          };
          // Update items with new selected item
          const tmpItems = items;
          tmpItems[parseInt(currentItem.id) - 1] = itemWithDetails;
          setRequestState({
            ...requestState,
            items: tmpItems,
            loading: false,
            loadingDetails: false,
          });
        } catch (err: any) {
          setRequestState({
            ...requestState,
            error: { msg: err.msg },
            loadingDetails: false,
          });
        }
      }
    },
    [items]
  );

  // Fetch items on page change
  useEffect(() => {
    if (!fetchedPages.includes(page)) {
      fetchItems();
    }
  }, [page]);

  // Fetch items on page change
  useEffect(() => {
    if (selectedItemId) {
      fetchItemDetails(selectedItemId);
    }
  }, [selectedItemId]);

  return {
    items,
    loading,
    error,
    loadingDetails,
    selectedItem,
    selectItem,
  };
};
