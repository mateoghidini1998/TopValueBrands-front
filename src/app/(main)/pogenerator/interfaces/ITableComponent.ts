
export interface Column {
  key: string;
  name: string;
  width?: string;
}

export interface TableComponentProps<T> {
  columns: Column[];
  data: T[] | any[];
  actions?: JSX.Element[];
  dispatchAction?: (product: T) => void;
  actionsWidth?: string;
  tableHeigth?: string;
  tableMaxHeight?: string;
}