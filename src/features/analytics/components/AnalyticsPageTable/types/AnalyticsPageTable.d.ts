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
  accessor?: string | ((row: any) => string),
  principalFilterableColumn?: boolean,
  disableFilters?: boolean,
  minWidth?: number,
  Footer?: ((row: FooterTable<GetPreviewType>) => JSX.Element) | (() => string),
  Cell?: ({ row }: CellTable<GetPreviewType>) => JSX.Element
};

export type Metrics = {
  pay: number,
  ratePerHour: number,
  employmentType: number,
  salary: number,
  parkingCostPerMonth: number,
  accountingPerMonth: number,
  hourlyCostFact: number,
  hourlyCostHand: number,
  earnings: number,
  incomeTaxContributions: number,
  districtCoefficient: number,
  pensionContributions: number,
  medicalContributions: number,
  socialInsuranceContributions: number,
  injuriesContributions: number,
  expenses: number,
  profit: number,
  profitAbility: number,
  grossSalary: number,
  prepayment: number,
  netSalary: number,
};

export type GetTableType = {
  employeeId: number | string | null,
  employeeCopyId?: string,
  isCopy?: boolean
  employeeFullName: string,
  metrics: Metrics,
  metricsDiff: Omit<Metrics, 'employmentType'> | null,
};

type TotalTableType = {
  metrics: {
    parkingCostPerMonth: number,
    accountingPerMonth: number,
    earnings: number,
    expenses: number,
    incomeTaxContributions: number,
    injuriesContributions: number,
    pensionContributions: number,
    medicalContributions: number,
    socialInsuranceContributions: number,
    profit: number,
    profitAbility: number,
    prepayment: number,
    netSalary: number,
  },
  metricsDiff: {
    parkingCostPerMonth: number,
    accountingPerMonth: number,
    earnings: number,
    expenses: number,
    incomeTaxContributions: number,
    pensionContributions: number,
    medicalContributions: number,
    socialInsuranceContributions: number,
    injuriesContributions: number,
    profit: number,
    profitAbility: number,
    prepayment: number,
    netSalary: number,
  }
};

export type AnalyticsType = {
  rows: GetTableType[],
  total: TotalTableType,
};
