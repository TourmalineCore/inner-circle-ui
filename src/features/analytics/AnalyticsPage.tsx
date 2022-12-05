/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { useEffect, useState } from 'react';
import {
  Button,
} from '@tourmalinecore/react-tc-ui-kit';
import { api } from '../../common/api';
import { formatMoney } from '../../common/utils/formatMoney';
import {
  GetPreviewType,
  PutPreviewType,
  TotalFinance,
} from './types/index';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import RedactComponent from './components/RedactComponent/RedactComponent';

import './AnalyticsPage.css';

type Row<Type> = {
  original: Type
};

type CellTable<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<(GetPreviewType)[]>([]);
  const [total, setTotal] = useState<TotalFinance>();

  useEffect(() => {
    loadTotals();
    loadEmployeesAsync();
  }, []);

  function getSum(key: string) {
    const sum = employees.map((el) => el[key as keyof GetPreviewType] as number)
      .reduce((pre: number, current: number) => pre += (current || 0), 0);

    return sum;
  }

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Analytics</DefaultCardHeader>
      )}
    >
      <div className="analitycs-page--btns">
        <Button onClick={() => { loadEmployeesAsync(); }}>Reset changes</Button>
      </div>
      <div style={{ paddingTop: 4 }}>
        <ClientTable
          tableId="analytics-salary-table"
          data={employees}
          order={{
            id: 'weightForSorting',
            desc: true,
          }}
          loading={isLoading}
          renderMobileTitle={(row : Row<{ fullName: string }>) => row.original.fullName}
          enableTableStatePersistance
          maxStillMobileBreakpoint={800}
          isStriped
          actions={[
            {
              name: 'edit-row-action',
              show: () => true,
              renderText: () => 'Dublicate',
              onClick: (e: any, row: any) => { dublicateEmployee(row.original.id); },
            },
            {
              name: 'edit-row-action',
              show: () => true,
              renderText: () => 'Delete',
              onClick: (e: any, row: any) => { deleteEmployee(row.original.id); },
            },
          ]}
          columns={[
            {
              Header: 'Employee',
              accessor: 'fullName',
              principalFilterableColumn: true,
              Footer: () => 'Total',
            },
            {
              Header: 'Rate/h',
              accessor: 'ratePerHour',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const {
                  id: employeeId, ratePerHour, pay, employmentType: employentCof, parkingCostPerMonth, ratePerHourDelta,
                } = row.original;

                const employmentType = employentCof === 1 ? 0 : 1;

                return (
                  <RedactComponent
                    value={formatMoney(ratePerHour)}
                    valueDelta={ratePerHourDelta}
                    onChange={(ratePerHour: number) => {
                      updateEmployeesAsync({
                        employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
                      });
                    }}
                  />
                );
              },
            },
            {
              Header: 'Pay',
              accessor: 'pay',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const {
                  id: employeeId, ratePerHour, pay, employmentType: employentCof, parkingCostPerMonth, payDelta,
                } = row.original;

                const employmentType = employentCof === 1 ? 0 : 1;

                return (
                  <RedactComponent
                    value={formatMoney(pay)}
                    valueDelta={payDelta}
                    onChange={(pay: number) => {
                      updateEmployeesAsync({
                        employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
                      });
                    }}
                  />
                );
              },
            },
            {
              Header: 'Employment type',
              accessor: 'employmentType',
              disableFilters: true,
            },
            {
              Header: 'Net Salary',
              accessor: 'netSalary',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { netSalary, netSalaryDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(netSalary)}
                    valueDelta={netSalaryDelta}
                  />
                );
              },
            },
            {
              Header: 'Hourly Cost (By Fact)',
              accessor: 'hourlyCostFact',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { hourlyCostFact, hourlyCostFactDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(hourlyCostFact)}
                    valueDelta={hourlyCostFactDelta}
                  />
                );
              },
            },
            {
              Header: 'Hourly Cost (On Hand)',
              accessor: 'hourlyCostHand',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { hourlyCostHand, hourlyCostHandDelta } = row.original;
                return (
                  <RedactComponent
                    value={formatMoney(hourlyCostHand)}
                    valueDelta={hourlyCostHandDelta}
                  />
                );
              },
            },
            {
              Header: 'Earnings',
              accessor: 'earnings',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { earnings, earningsDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(earnings)}
                    valueDelta={earningsDelta}
                  />
                );
              },
              Footer: () => getTotalCost(
                (total as TotalFinance).earningsTotal,
                getSum('earnings'),
              ),
            },
            {
              Header: 'Expenses',
              accessor: 'expenses',
              disableFilters: true,
              minWidth: 160,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { expenses, expensesDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(expenses)}
                    valueDelta={expensesDelta}
                  />
                );
              },
              Footer: () => getTotalCost(
                (total as TotalFinance).expensesTotal,
                getSum('expenses'),
              ),
            },
            {
              Header: 'Profit',
              accessor: 'profit',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { profit, profitDelta } = row.original;

                return (
                  <RedactComponent
                    value={formatMoney(profit)}
                    valueDelta={profitDelta}
                  />
                );
              },
              Footer: () => getTotalCost(
                (total as TotalFinance).profitTotal,
                getSum('profit'),
              ),
            },
            {
              Header: 'Profitability',
              accessor: 'profitAbility',
              disableFilters: true,
              Cell: ({ row }: CellTable<GetPreviewType>) => {
                const { profitAbility, profitAbilityDelta } = row.original;

                return (
                  <RedactComponent
                    value={`${profitAbility}%`}
                    valueDelta={profitAbilityDelta}
                  />
                );
              },
              Footer: () => getTotalCost(
                (total as TotalFinance).profitabilityTotal,
                (getSum('profit') / getSum('earnings')) * 100,
                true,
              ),
            },
          ]}
        />
      </div>

    </ContentCard>
  );

  function getTotalCost(total: number, sumTotal: number, isPrecent: boolean = false) {
    sumTotal = Number(sumTotal.toFixed(2));
    total = Number(total.toFixed(2));
    return (
      <div>
        <RedactComponent
          value={(isPrecent ? `${sumTotal}%` : formatMoney(sumTotal))}
          valueDelta={Number((sumTotal - total).toFixed(2))}
        />
      </div>
    );
  }

  function dublicateEmployee(idEmployee: number) {
    const copyEmployee = employees.find((el) => el.id === idEmployee);
    if (copyEmployee) {
      setEmployees([...employees, copyEmployee]);
    }
  }

  async function deleteEmployee(idEmployee: number) {
    const copyEmployee = employees.find((el) => el.id === idEmployee);
    if (copyEmployee) {
      const index = employees.indexOf(copyEmployee);
      const newEmployees = employees.slice();
      newEmployees.splice(index, 1);
      setEmployees(newEmployees);
    }
  }

  async function updateEmployeesAsync(employee: PutPreviewType) {
    const { data } = await api.post<GetPreviewType>('finance/get-preview', employee);

    const index = employees.find((el) => el.id === employee.employeeId);

    if (index) {
      const newemp = employees.slice();
      newemp[newemp.indexOf(index)] = data;
      setEmployees(newemp);
    }
  }

  async function loadTotals() {
    const totals : TotalFinance = {
      earningsTotal: getSum('earnings'),
      expensesTotal: getSum('expenses'),
      profitTotal: getSum('profit'),
      profitabilityTotal: (getSum('profit') / getSum('earnings')) * 100,
    };

    setTotal(totals);
  }

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.get<GetPreviewType[]>('finance/get-analytic');

      setEmployees(data);

      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }
}

export default AnalyticsPage;
