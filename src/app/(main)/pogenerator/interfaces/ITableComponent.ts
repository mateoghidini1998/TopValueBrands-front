export interface Column {
  key: string;
  name: string;
  width?: string;
}

export interface TableComponentProps<T> {
  columns: Column[];
  data: T[];
}