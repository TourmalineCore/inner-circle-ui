export type Row<TypeProps> = {
  original: TypeProps
  values: TypeProps;
};

export type CellTable<TypeProps> = {
  row: Row<TypeProps>
};

export type FooterTable<TypeProps> = {
  page: Array<{
    values: TypeProps;
    original: TypeProps;
  }>;
  filteredRows: Array<{
    values: TypeProps;
    original: TypeProps;
  }>;
};

export type ColumnType = {
  Header: string,
  accessor?: string,
  principalFilterableColumn?: boolean,
  disableFilters?: boolean,
  minWidth?: number,
  Footer?: ((row: FooterTable<GetPreviewType>) => JSX.Element) | (() => string),
  Cell?: ({ row }: CellTable<GetPreviewType>) => JSX.Element
};
