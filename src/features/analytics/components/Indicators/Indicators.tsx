import { useEffect, useState } from 'react';
import { api } from '../../../../common/api';
import ContentCard from '../../../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../../../components/DefaultCardHeader/DefaultCardHeader';
import { IndicatorsType } from '../../types';
import { formatMoney } from '../../../../common/utils/formatMoney';

import IndicatorComponent from '../IndicatorComponent/IndicatorComponent';
import IndicatorValue from '../IndicatorValue/IndicatorValue';

import './Indicators.css';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';

function Indicators() {
  const [indicators, setIndicators] = useState<IndicatorsType>({
    totalExpenses: {
      payrollExpense: 0,
      officeExpense: 0,
      totalExpense: 0,
    },
    desiredFinancialMetrics: {
      desiredIncome: 0,
      desiredProfit: 0,
      desiredProfitability: 0,
    },
    reserveFinance: {
      reserveForQuarter: 0,
      reserveForHalfYear: 0,
      reserveForYear: 0,
    },
    workingDays: {
      workingDaysInYear: 0,
      workingDaysInYearWithoutVacation: 0,
      workingDaysInYearWithoutVacationAndSick: 0,
      workingDaysInMonth: 0,
      workingHoursInMonth: 0,
    },
    incomeTaxPercent: 0,
    districtCoefficient: 0,
    minimumWage: 0,
  });

  useEffect(() => {
    getTotalIndicatorsAsync();
  }, []);

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Indicators</DefaultCardHeader>
      )}
    >
      <div className="indicators" data-testid="indicators">

        <IndicatorComponent head="Reserve for the">
          <IndicatorValue dataTestId="reserve-for-quarter-label" label={<li>Quarter</li>} value={formatMoney(indicators.reserveFinance.reserveForQuarter)} />
          <IndicatorValue dataTestId="reserve-for-half-year-label" label={<li>Half a year</li>} value={formatMoney(indicators.reserveFinance.reserveForHalfYear)} />
          <IndicatorValue dataTestId="reserve-for-year-label" label={<li>Year</li>} value={formatMoney(indicators.reserveFinance.reserveForYear)} />
        </IndicatorComponent>

        <IndicatorComponent head="Desired">
          <IndicatorValue dataTestId="desired-income-label" label={<li>Income</li>} value={formatMoney(indicators.desiredFinancialMetrics.desiredIncome)} />
          <IndicatorValue dataTestId="desired-profit-label" label={<li>Profit</li>} value={formatMoney(indicators.desiredFinancialMetrics.desiredProfit)} />
          <IndicatorValue dataTestId="desired-profitability-label" label={<li>Profitability</li>} value={formatMoney(indicators.desiredFinancialMetrics.desiredProfitability)} />
        </IndicatorComponent>

        <IndicatorComponent>
          <IndicatorValue dataTestId="total-expense-label" isColumn label="Total expense (month)" value={formatMoney(indicators.totalExpenses.totalExpense)} />
          <div className="indicators-absolute__components">
            <IndicatorValue dataTestId="payroll-expense-label" isColumn label="Salary" value={formatMoney(indicators.totalExpenses.payrollExpense)} />
            <IndicatorValue dataTestId="office-expense-label" isColumn label="Office" value={formatMoney(indicators.totalExpenses.officeExpense)} />
          </div>
        </IndicatorComponent>

        <IndicatorComponent>
          <IndicatorValue dataTestId="working-days-in-year-label" label="Working days per year:" value={indicators.workingDays.workingDaysInYear.toString()} />
          <IndicatorValue dataTestId="working-days-in-year-without-vacation-label" label={<li>Vacation (days):</li>} value={indicators.workingDays.workingDaysInYearWithoutVacation.toString()} />
          <IndicatorValue dataTestId="working-days-in-year-without-vacation-and-sick-label" label={<li>Sick leave (days):</li>} value={indicators.workingDays.workingDaysInYearWithoutVacationAndSick.toString()} />
          <IndicatorValue dataTestId="working-days-in-month-label" label="Working days per month (avg.):" value={indicators.workingDays.workingDaysInMonth.toString()} />
          <IndicatorValue dataTestId="working-hours-in-month-label" label="Hours per month (avg.):" value={indicators.workingDays.workingHoursInMonth.toString()} />
        </IndicatorComponent>

        <div className="indicators-double__components">
          <IndicatorComponent isLite>
            <IndicatorValue dataTestId="district-coefficient-label" isColumn label="District coefficient" value={`${indicators.districtCoefficient * 100} %`} />
          </IndicatorComponent>
          <IndicatorComponent isLite>
            <IndicatorValue dataTestId="income-tax-percent-label" isColumn label="Income tax" value={`${indicators.incomeTaxPercent * 100} %`} />
          </IndicatorComponent>
        </div>

        <IndicatorComponent isLite style={{ alignSelf: 'baseline' }}>
          <IndicatorValue dataTestId="minimum-wage-label" isColumn label="Minimum Wage" value={formatMoney(indicators.minimumWage)} />
        </IndicatorComponent>

      </div>
    </ContentCard>
  );

  async function getTotalIndicatorsAsync() {
    const { data } = await api.get<IndicatorsType>(`${LINK_TO_SALARY_SERVICE}finance/get-total-finance`);
    setIndicators(data);
  }
}

export default Indicators;
