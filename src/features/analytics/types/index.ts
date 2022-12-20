export type PutPreviewType = {
  employeeId: number | string,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  parkingCostPerMonth: number,
};

export type GetPreviewType = {
  id: number | string,
  fullName: string,
  pay: number,
  payDelta: number,
  ratePerHour: number,
  ratePerHourDelta: number,
  employmentType: number,
  salary: number,
  salaryDelta: number,
  parkingCostPerMonth: number,
  parkingCostPerMonthDelta: number,
  accountingPerMonth: number,
  accountingPerMonthDelta: number,
  hourlyCostFact: number,
  hourlyCostFactDelta: number,
  hourlyCostHand: number,
  hourlyCostHandDelta: number,
  earnings: number,
  earningsDelta: number,
  incomeTaxContributions: number,
  incomeTaxContributionsDelta: number,
  districtCoefficient: number,
  districtCoefficientDelta: number,
  pensionContributions: number,
  pensionContributionsDelta: number,
  medicalContributions: number,
  medicalContributionsDelta: number,
  socialInsuranceContributions: number,
  socialInsuranceContributionsDelta: number,
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

export type IndicatorsType = {
  totalExpenses: {
    payrollExpense: number,
    officeExpense: number,
    totalExpense: number
  },
  desiredFinancialMetrics: {
    desiredIncome: number,
    desiredProfit: number,
    desiredProfitability: number
  },
  reserveFinance: {
    reserveForQuarter: number,
    reserveForHalfYear: number,
    reserveForYear: number
  }
};

export type IndicatorType = {
  label: string,
  value: string,
};
