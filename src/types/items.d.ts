type ListItem = {
  id: string;
  title: string;
  link: string;
  details?: { name: string; value: string | number }[];
};

type GetListItemsRequest = {
  offset: number;
  count: number;
};

type GetListItemsResponse = ListItem[];

type GetListItemDetailsRequest = {
  id: string;
};

type GetListItemDetailsResponse = {
  id: string;
  title: string;
  author: string;
  image: string;
  price: number;
};
