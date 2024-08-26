import { useEffect, useState } from 'react';
import { api } from '../../../../common/api';
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
    <>
      <h2 className="heading">Indicators</h2>

      <div className="indicators">

        <IndicatorComponent head="Reserve for the">
          <IndicatorValue label={<li>Quarter</li>} value={formatMoney(indicators.reserveFinance.reserveForQuarter)} />
          <IndicatorValue label={<li>Half a year</li>} value={formatMoney(indicators.reserveFinance.reserveForHalfYear)} />
          <IndicatorValue label={<li>Year</li>} value={formatMoney(indicators.reserveFinance.reserveForYear)} />
        </IndicatorComponent>

        <IndicatorComponent head="Desired">
          <IndicatorValue label={<li>Income</li>} value={formatMoney(indicators.desiredFinancialMetrics.desiredIncome)} />
          <IndicatorValue label={<li>Profit</li>} value={formatMoney(indicators.desiredFinancialMetrics.desiredProfit)} />
          <IndicatorValue label={<li>Profitability</li>} value={formatMoney(indicators.desiredFinancialMetrics.desiredProfitability)} />
        </IndicatorComponent>

        <IndicatorComponent>
          <IndicatorValue isColumn label="Total expense (month)" value={formatMoney(indicators.totalExpenses.totalExpense)} />
          <div className="indicators-absolute__components">
            <IndicatorValue isColumn label="Salary" value={formatMoney(indicators.totalExpenses.payrollExpense)} />
            <IndicatorValue isColumn label="Office" value={formatMoney(indicators.totalExpenses.officeExpense)} />
          </div>
        </IndicatorComponent>

        <IndicatorComponent>
          <IndicatorValue label="Working days per year:" value={indicators.workingDays.workingDaysInYear.toString()} />
          <IndicatorValue label={<li>Vacation (days):</li>} value={indicators.workingDays.workingDaysInYearWithoutVacation.toString()} />
          <IndicatorValue label={<li>Sick leave (days):</li>} value={indicators.workingDays.workingDaysInYearWithoutVacationAndSick.toString()} />
          <IndicatorValue label="Working days per month (avg.):" value={indicators.workingDays.workingDaysInMonth.toString()} />
          <IndicatorValue label="Hours per month (avg.):" value={indicators.workingDays.workingHoursInMonth.toString()} />
        </IndicatorComponent>

        <div className="indicators-double__components">
          <IndicatorComponent isLite>
            <IndicatorValue isColumn label="District coefficient" value={`${indicators.districtCoefficient * 100} %`} />
          </IndicatorComponent>
          <IndicatorComponent isLite>
            <IndicatorValue isColumn label="Income tax" value={`${indicators.incomeTaxPercent * 100} %`} />
          </IndicatorComponent>
        </div>

        <IndicatorComponent isLite style={{ alignSelf: 'baseline' }}>
          <IndicatorValue isColumn label="Minimum Wage" value={formatMoney(indicators.minimumWage)} />
        </IndicatorComponent>

      </div>
    </>
  );

  async function getTotalIndicatorsAsync() {
    const { data } = await api.get<IndicatorsType>(`${LINK_TO_SALARY_SERVICE}finance/get-total-finance`);
    setIndicators(data);
  }
}

export default Indicators;
