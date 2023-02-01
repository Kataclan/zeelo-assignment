import { memo, useCallback } from "react";

interface ListItemProps {
  item: ListItem;
  selected?: boolean;
  loadingDetails?: boolean;
  onClick?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  selected = false,
  loadingDetails = false,
  onClick = () => {},
}) => {
  const handleClickDetails = useCallback(() => {
    onClick();
  }, []);

  return (
    <button
      className="w-full px-4 py-2 font-medium text-left border-b border-gray-200 cursor-pointer focus:outline-none"
      onClick={handleClickDetails}
    >
      <div className="w-full flex justify-between items-center">
        <span>{item.title}</span> <span>+</span>
      </div>
      {selected && (
        <div className="flex py-4 px-2">
          {loadingDetails ? (
            <div className="flex w-full justify-center">Loading details...</div>
          ) : (
            <ul>
              {item.details?.map((detail) => (
                <li key={detail.name}>
                  {detail.name} : {detail.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </button>
  );
};

export default memo(ListItem);
