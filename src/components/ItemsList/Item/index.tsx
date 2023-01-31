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
    <div>
      <div>
        <span>{item.title}</span>{" "}
        <button onClick={handleClickDetails}>Details</button>
      </div>
      {selected && (
        <div>
          {loadingDetails ? (
            <div>Loading details...</div>
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
    </div>
  );
};

export default memo(ListItem);
