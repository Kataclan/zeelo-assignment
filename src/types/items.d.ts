type ListItem = {
  id: string;
  title: string;
  link: string;
};

type GetListItemsRequest = {
  offset: number;
  count: number;
};

type GetListItemsResponse = {
  items: ListItem[];
};
