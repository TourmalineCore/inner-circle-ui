import { useEffect, useState } from 'react';
import { api } from '../../../../common/api';
import ContentCard from '../../../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../../../components/DefaultCardHeader/DefaultCardHeader';
import { IndicatorsType } from '../../types';
import AbsoluteDuoComponent from '../IndicatorComponent/AbsoluteDuoComponent';
import { formatMoney } from '../../../../common/utils/formatMoney';
import MarkerListComponent from '../IndicatorComponent/MarkerListComponent';

import './Indicators.css';
import SingleComponent from '../IndicatorComponent/SingleComponent';
import ListComponent from '../IndicatorComponent/ListComponent';

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
      <div className="indicators">
        <MarkerListComponent
          header="Reserve for the"
          valuse={[
            { label: 'Quarter', value: formatMoney(indicators.reserveFinance.reserveForQuarter) },
            { label: 'Half a year', value: formatMoney(indicators.reserveFinance.reserveForHalfYear) },
            { label: 'Year', value: formatMoney(indicators.reserveFinance.reserveForYear) },
          ]}
          icon="icon-reverse"
        />
        <MarkerListComponent
          header="Desired"
          valuse={[
            { label: 'Income', value: formatMoney(indicators.desiredFinancialMetrics.desiredIncome) },
            { label: 'Profit', value: formatMoney(indicators.desiredFinancialMetrics.desiredProfit) },
            { label: 'Profitability', value: formatMoney(indicators.desiredFinancialMetrics.desiredProfitability) },
          ]}
          icon="icon-desired"
        />
        <ListComponent
          values={[
            { label: 'Working days per year:', value: indicators.workingDays.workingDaysInYear.toString() },
            { label: 'Vacation (days):', value: indicators.workingDays.workingDaysInYearWithoutVacation.toString() },
            { label: 'Sick leave (days):', value: indicators.workingDays.workingDaysInYearWithoutVacationAndSick.toString() },
            { label: 'Working days per month (avg.):', value: indicators.workingDays.workingDaysInMonth.toString() },
            { label: 'Hours per month (avg.):', value: indicators.workingDays.workingHoursInMonth.toString() },
          ]}
          icon="icon-calendar"
        />
        <AbsoluteDuoComponent
          sumValue={{ label: 'Total expense (month)', value: formatMoney(indicators.totalExpenses.totalExpense) }}
          leftValue={{ label: 'Salary', value: formatMoney(indicators.totalExpenses.payrollExpense) }}
          rightValue={{ label: 'Office', value: formatMoney(indicators.totalExpenses.officeExpense) }}
          icon="icon-expense"
        />
        <div className="indicators-double__components">
          <SingleComponent
            value={{ label: 'District coefficient', value: `${indicators.districtCoefficient} %` }}
            icon="icon-district"
          />
          <SingleComponent
            value={{ label: 'Income tax', value: `${indicators.incomeTaxPercent} %` }}
            icon="icon-tax"
          />
        </div>
        <SingleComponent
          value={{ label: 'Minimum Wage', value: formatMoney(indicators.minimumWage) }}
          icon="icon-wage"
        />
      </div>
    </ContentCard>
  );

  async function getTotalIndicatorsAsync() {
    const { data } = await api.get<IndicatorsType>('finance/get-total-finance');
    setIndicators(data);
  }
}

export default Indicators;
