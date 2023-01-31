import { useCallback } from "react";

import { Heading, ItemsList } from "./components";
import { useListItems } from "./hooks";

const App: React.FC = () => {
  const { items, loading, error, selectItem, selectedItem, loadingDetails } =
    useListItems(0);

  const handleClickItem = useCallback((item: ListItem) => {
    selectItem(item.id);
  }, []);

  return (
    <div>
      <Heading>Zeelo Assignment</Heading>
      <ItemsList
        items={items}
        selectedItem={selectedItem}
        loading={loading}
        error={error !== null}
        loadingDetails={loadingDetails}
        onClickItem={handleClickItem}
      />
    </div>
  );
};

export default App;
