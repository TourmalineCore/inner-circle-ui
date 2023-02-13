export type PutPreviewType = {
  employeeId: number | string | null,
  rowPosition?: number | string,
  ratePerHour: number,
  pay: number,
  employmentType: number,
  parkingCostPerMonth: number,
};

export type GetPreviewType = {
  id: number | string,
  fullName: string,
  pay: number,
  payDelta?: number,
  ratePerHour: number,
  ratePerHourDelta?: number,
  employmentType: number,
  salary: number,
  salaryDelta?: number,
  parkingCostPerMonth: number,
  parkingCostPerMonthDelta?: number,
  accountingPerMonth: number,
  accountingPerMonthDelta?: number,
  hourlyCostFact: number,
  hourlyCostFactDelta?: number,
  hourlyCostHand: number,
  hourlyCostHandDelta?: number,
  earnings: number,
  earningsDelta?: number,
  incomeTaxContributions: number,
  incomeTaxContributionsDelta?: number,
  districtCoefficient: number,
  districtCoefficientDelta?: number,
  pensionContributions: number,
  pensionContributionsDelta?: number,
  medicalContributions: number,
  medicalContributionsDelta?: number,
  socialInsuranceContributions: number,
  socialInsuranceContributionsDelta?: number,
  injuriesContributions: number,
  injuriesContributionsDelta?: number,
  expenses: number,
  expensesDelta?: number,
  profit: number,
  profitDelta?: number,
  profitAbility: number,
  profitAbilityDelta?: number,
  grossSalary: number,
  grossSalaryDelta?: number,
  prepayment: number,
  prepaymentDelta?: number,
  netSalary: number,
  netSalaryDelta?: number
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
  },
  workingDays: {
    workingDaysInYear: number,
    workingDaysInYearWithoutVacation: number,
    workingDaysInYearWithoutVacationAndSick: number,
    workingDaysInMonth: number,
    workingHoursInMonth: number
  },
  incomeTaxPercent: number,
  districtCoefficient: number,
  minimumWage: number
};

export type IndicatorType = {
  label: string,
  value: string,
};

// new
export interface Metrics {
  ratePerHour: number;
  pay: number;
  employmentType: number;
  parkingCostPerMonth: number;
  salary: number;
  accountingPerMonth: number;
  hourlyCostFact: number;
  hourlyCostHand: number;
  earnings: number;
  expenses: number;
  incomeTaxContributions: number;
  districtCoefficient: number;
  pensionContributions: number;
  medicalContributions: number;
  socialInsuranceContributions: number;
  injuriesContributions: number;
  profit: number;
  profitAbility: number;
  grossSalary: number;
  prepayment: number;
  netSalary: number;
}

export interface MetricsDiff {
  ratePerHour: number;
  pay: number;
  parkingCostPerMonth: number;
  salary: number;
  accountingPerMonth: number;
  hourlyCostFact: number;
  hourlyCostHand: number;
  earnings: number;
  expenses: number;
  incomeTaxContributions: number;
  districtCoefficient: number;
  pensionContributions: number;
  medicalContributions: number;
  socialInsuranceContributions: number;
  injuriesContributions: number;
  profit: number;
  profitAbility: number;
  grossSalary: number;
  prepayment: number;
  netSalary: number;
}

export interface Employee {
  employeeId: number;
  metrics: Metrics;
  metricsDiff: MetricsDiff;
}

export interface Source {
  parkingCostPerMonth: number;
  accountingPerMonth: number;
  earnings: number;
  expenses: number;
  incomeTaxContributions: number;
  pensionContributions: number;
  medicalContributions: number;
  socialInsuranceContributions: number;
  injuriesContributions: number;
  profit: number;
  profitAbility: number;
  prepayment: number;
  netSalary: number;
}

export interface MetricsDiffTotal {
  parkingCostPerMonth: number;
  accountingPerMonth: number;
  earnings: number;
  expenses: number;
  incomeTaxContributions: number;
  pensionContributions: number;
  medicalContributions: number;
  socialInsuranceContributions: number;
  injuriesContributions: number;
  profit: number;
  profitAbility: number;
  prepayment: number;
  netSalary: number;
}

export interface Total {
  source: Source;
  metricsDiff: MetricsDiffTotal;
}
export interface RootObject {
  employees: Employee[];
  total: Total;
}
