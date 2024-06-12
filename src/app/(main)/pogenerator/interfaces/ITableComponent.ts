export interface Column {
  key: string;
  name: string;
}

export interface TableComponentProps<T> {
  columns: Column[];
  data: T[];
}