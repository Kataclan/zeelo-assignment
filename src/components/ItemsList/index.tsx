import ListItem from "./Item";

import {
  DEFAULT_LIST_ITEMS_PER_PAGE,
  DEFAULT_TOTAL_ITEMS,
} from "../../constants";
import { useListItems, usePagination } from "../../hooks";
import Paginator from "../Paginator";
import Heading from "../Heading";

const ListItemSkeleton: React.FC = () => {
  return <div>Loading...</div>;
};

interface PresentationalProps {
  items: ListItem[];
  selectedItemId?: string;
  totalPages?: number;
  currentPage?: number;
  loading?: boolean;
  loadingDetails?: boolean;
  error?: string;
  skeletonCount?: number;
  onClickItem?: (itemId: string) => void;
  onClickPageButton?: (page: number) => void;
}

export const ItemsListPresentational: React.FC<PresentationalProps> = ({
  items,
  totalPages = DEFAULT_TOTAL_ITEMS / DEFAULT_LIST_ITEMS_PER_PAGE,
  currentPage = 0,
  selectedItemId = "",
  loading = false,
  loadingDetails = false,
  error = "",
  skeletonCount = DEFAULT_LIST_ITEMS_PER_PAGE,
  onClickItem = () => {},
  onClickPageButton = () => {},
}) => {
  const itemsToRender = loading
    ? Array.from({ length: skeletonCount }).map((o, i) => (
        <ListItemSkeleton key={i} />
      ))
    : items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          selected={item.id === selectedItemId}
          loadingDetails={loadingDetails}
          onClick={() => onClickItem(item.id)}
        />
      ));
  return (
    <div>
      <Heading>Items List</Heading>
      <div>
        {error !== "" && !loading ? (
          <span>{error}</span>
        ) : (
          <div>
            <div>{itemsToRender}</div>
            <Paginator
              totalPages={DEFAULT_TOTAL_ITEMS / DEFAULT_LIST_ITEMS_PER_PAGE}
              currentPage={currentPage}
              onClickPage={onClickPageButton}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ItemsListContainer: React.FC = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const { items, loading, error, loadingDetails, selectedItem, selectItem } =
    useListItems(currentPage);

  const handleSelectItem = (itemId: string) => {
    selectItem(itemId);
  };

  const handleClickPageButton = (page: number) => {
    setCurrentPage(page);
  };

  const itemsToRender = items.slice(
    currentPage * DEFAULT_LIST_ITEMS_PER_PAGE,
    (currentPage + 1) * DEFAULT_LIST_ITEMS_PER_PAGE
  );

  return (
    <div>
      <ItemsListPresentational
        items={itemsToRender}
        loading={loading}
        loadingDetails={loadingDetails}
        error={error?.msg}
        selectedItemId={selectedItem?.id}
        onClickItem={handleSelectItem}
        onClickPageButton={handleClickPageButton}
      />
    </div>
  );
};

export default ItemsListContainer;
