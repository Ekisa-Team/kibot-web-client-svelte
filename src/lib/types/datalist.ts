export type DataListItem<T> = {
  value: T;
  text: string;
  icon?: string;
};

export type Datalist<T> = Array<DataListItem<T>>;
