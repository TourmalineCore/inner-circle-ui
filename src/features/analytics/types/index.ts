export type AnalyticsSalaryType = {
  id: number,
  fullName: string,
  pay: number,
  ratePerHour: number,
  employmentType: number,
  parkingCostPerMonth: number,
  hourlyCostFact: number,
  hourlyCostHand: number,
  earnings: number,
  incomeTaxContributions: number,
  pensionContributions: number,
  medicalContributions: number,
  socialInsuranceContributions: number,
  injuriesContributions: number,
  expenses: number,
  profit: number,
  profitAbility: number,
  grossSalary: number,
  prepayment: number,
  netSalary: number
};

export type TotalExpensesType = {
  payrollExpense: number,
  officeExpense: number,
  totalExpense: number,
};

export type DesiredMetricsType = {
  desiredIncome: number,
  desiredProfit: number,
  desiredProfitability: number,
};

export type ReserveFinanceType = {
  reserveForQuarter: number,
  reserveForHalfYear: number,
  reserveForYear: number,
};

export type TotalFinance = {
  totalExpenses: TotalExpensesType,
  desiredMetrics: DesiredMetricsType,
  reserveFinance: ReserveFinanceType,
};

export type PutPreviewType = {
  employeeId: number,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  parkingCostPerMonth: number,
};

export type GetPreviewType = {
  id: number,
  fullName: string,
  pay: number,
  payDelta: number,
  ratePerHour: number,
  ratePerHourDelta: number,
  employmentType: number,
  parkingCostPerMonth: number,
  hourlyCostFact: number,
  hourlyCostFactDelta: number,
  hourlyCostHand: number,
  hourlyCostHandDelta: number,
  earnings: number,
  earningsDelta: number,
  incomeTaxContributions: number,
  incomeTaxContributionsDelta: number,
  pensionContributions: number,
  pensionContributionsDelta: number,
  medicalContributions: number,
  medicalContributionsDelta: number,
  socialInsuranceContributions: number,
  injuriesContributions: number,
  injuriesContributionsDelta: number,
  expenses: number,
  expensesDelta: number,
  profit: number,
  profitDelta: number,
  profitAbility: number,
  profitAbilityDelta: number,
  grossSalary: number,
  grossSalaryDelta: number,
  prepayment: number,
  prepaymentDelta: number,
  netSalary: number,
  netSalaryDelta: number
};
