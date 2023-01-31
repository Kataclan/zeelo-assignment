import { memo } from "react";

import ListItem from "./Item";

import { DEFAULT_LIST_ITEMS_PER_PAGE } from "../../constants";

const ListItemSkeleton: React.FC = () => {
  return <div>Loading...</div>;
};

interface ItemsListProps {
  items: ListItem[];
  selectedItem?: ListItem | null;
  loading?: boolean;
  loadingDetails?: boolean;
  error?: boolean;
  skeletonCount?: number;
  onClickItem?: (item: ListItem) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  selectedItem,
  loading = false,
  loadingDetails = false,
  error = false,
  skeletonCount = DEFAULT_LIST_ITEMS_PER_PAGE,
  onClickItem = () => {},
}) => {
  const itemsToRender = loading
    ? Array.from({ length: skeletonCount }).map((o, i) => (
        <ListItemSkeleton key={i} />
      ))
    : items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          selected={item.id === selectedItem?.id}
          loadingDetails={loadingDetails}
          onClick={() => onClickItem(item)}
        />
      ));
  return (
    <div>
      {error && !loading ? <div>An error has ocurred</div> : itemsToRender}
    </div>
  );
};

export default memo(ItemsList);
