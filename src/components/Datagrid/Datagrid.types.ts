import React from 'react';

export interface Column<T> {
  key: string;
  label: string;
  accessor: (row: T) => React.ReactNode;
  searchable?: boolean;
  sortable?: boolean;
  filtered?: boolean;
  defaultSort?: boolean;
  hidden?: boolean;
}

export interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  loading?: boolean;
  error?: string;
}