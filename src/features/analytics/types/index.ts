export type TotalFinance = {
  earningsTotal: number,
  expensesTotal: number,
  profitTotal: number,
  profitabilityTotal: number,
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
