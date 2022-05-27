type TableColumn = {
  icon?: string;
  text?: string;
  cssClass?: string;
};

type TableCell = {
  text?: string;
  cssClass?: string;
};

type TableRow = Array<TableCell>;

export type TableColumns = Array<TableColumn>;
export type TableDataSource = Array<unknown>;
