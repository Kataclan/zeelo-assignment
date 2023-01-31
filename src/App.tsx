import { useCallback } from "react";

import { useListItems, usePagination } from "./hooks";
import { Heading, ItemsList, Paginator } from "./components";
import { DEFAULT_LIST_ITEMS_PER_PAGE, DEFAULT_TOTAL_ITEMS } from "./constants";
import CreateItemForm from "./components/CreateItemForm";

const App: React.FC = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const {
    items,
    loading,
    error,
    selectItem,
    selectedItem,
    loadingDetails,
    creatingItem,
    createItem,
  } = useListItems(currentPage);

  const handleClickItem = useCallback((item: ListItem) => {
    selectItem(item.id);
  }, []);

  const handleClickPageButton = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleCreateItemFormSubmit = useCallback((details: ListItemDetails) => {
    createItem(details);
  }, []);

  const itemsToRender = items.slice(
    currentPage * DEFAULT_LIST_ITEMS_PER_PAGE,
    (currentPage + 1) * DEFAULT_LIST_ITEMS_PER_PAGE
  );

  return (
    <div>
      <Heading>Zeelo Assignment</Heading>
      <ItemsList
        items={itemsToRender}
        selectedItem={selectedItem}
        loading={loading}
        error={error !== null}
        loadingDetails={loadingDetails}
        onClickItem={handleClickItem}
      />
      <Paginator
        totalPages={DEFAULT_TOTAL_ITEMS / DEFAULT_LIST_ITEMS_PER_PAGE}
        currentPage={currentPage}
        onClickPage={handleClickPageButton}
      />

      <CreateItemForm
        onSubmit={(details) => handleCreateItemFormSubmit(details)}
      />
    </div>
  );
};

export default App;
