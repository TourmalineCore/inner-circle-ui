/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import {
  Button, CheckField,
} from '@tourmalinecore/react-tc-ui-kit';
import { formatMoney } from '../../../../common/utils/formatMoney';
import ContentCard from '../../../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../../../components/DefaultCardHeader/DefaultCardHeader';
import { GetPreviewType, PutPreviewType } from '../../types';
import RedactComponent from '../RedactComponent/RedactComponent';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import {
  CellTable, ColumnType, FooterTable, Row,
} from './types/AnalyticsPageTable';

const checkFormatColumnsData = {
  1: 'All',
  2: 'Main parameters',
};

const employeeTypeData = {
  1: 'Half Time',
  2: 'Full Time',
};

function AnalyticsPageTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialEmployees, setInitialEmployees] = useState<(GetPreviewType)[]>([]);
  const [employees, setEmployees] = useState<(GetPreviewType)[]>([]);
  const [selectedViewColumns, setSelectedViewColumns] = useState('2');

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  const columnForMain: ColumnType[] = [
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
          id: employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth, ratePerHourDelta,
        } = row.original;

        return (
          <RedactComponent
            value={formatMoney(ratePerHour)}
            valueDelta={ratePerHourDelta}
            onChange={(ratePerHour: number) => {
              updateEmployeesAsync({
                employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
              });
            }}
            isEditable
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
          id: employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth, payDelta,
        } = row.original;

        return (
          <RedactComponent
            value={formatMoney(pay)}
            valueDelta={payDelta}
            onChange={(pay: number) => {
              updateEmployeesAsync({
                employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
              });
            }}
            isEditable
          />
        );
      },
    },
    {
      Header: 'Employment type',
      accessor: 'employmentType',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const {
          employmentType, id: employeeId, ratePerHour, pay, parkingCostPerMonth,
        } = row.original;

        return (
          <div className="cell-component">
            <select
              value={employmentType}
              className="cell-component__select"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                event.preventDefault();
                const employmentType = Number(event.target.value);
                return updateEmployeesAsync({
                  employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
                });
              }}
            >
              <option value={0.5}>{employeeTypeData[1]}</option>
              <option value={1}>{employeeTypeData[2]}</option>
            </select>
          </div>
        );
      },
    },
    {
      Header: 'Salary',
      accessor: 'salary',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { salary, salaryDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(salary)}
            valueDelta={salaryDelta}
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
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('earnings', row.page),
        getSumForTotal('earningsDelta', row.page),
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
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('expenses', row.page),
        getSumForTotal('expensesDelta', row.page),
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
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('profit', row.page),
        getSumForTotal('profitDelta', row.page),
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
            value={`${profitAbility.toFixed(2)}%`}
            valueDelta={profitAbilityDelta ? Number(profitAbilityDelta.toFixed(2)) : undefined}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => {
        const sumValue = getSumForTotal('profit', row.page) / getSumForTotal('earnings', row.page);

        const sumDelta = sumValue - (getSumForTotal('profit', row.page) - getSumForTotal('profitDelta', row.page))
            / (getSumForTotal('earnings', row.page) - getSumForTotal('earningsDelta', row.page));

        return getTotalCost(
          sumValue,
          sumDelta,
          true,
        );
      },
    },
  ];

  type SumTotal = {
    original: GetPreviewType,
  };
  const columnForAll: ColumnType[] = [
    ...columnForMain,
    {
      Header: 'District coefficient',
      accessor: 'districtCoefficient',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { districtCoefficient, districtCoefficientDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(districtCoefficient)}
            valueDelta={districtCoefficientDelta}
          />
        );
      },
    },
    {
      Header: 'Gross salary',
      accessor: 'grossSalary',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { grossSalary, grossSalaryDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(grossSalary)}
            valueDelta={grossSalaryDelta}
          />
        );
      },
    },
    {
      Header: 'Prepayment',
      accessor: 'prepayment',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { prepayment, prepaymentDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(prepayment)}
            valueDelta={prepaymentDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('prepayment', row.page),
        getSumForTotal('prepaymentDelta', row.page),
      ),
    },
    {
      Header: 'Income tax',
      accessor: 'incomeTaxContributions',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { incomeTaxContributions, incomeTaxContributionsDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(incomeTaxContributions)}
            valueDelta={incomeTaxContributionsDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('incomeTaxContributions', row.page),
        getSumForTotal('incomeTaxContributionsDelta', row.page),
      ),
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
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('netSalary', row.page),
        getSumForTotal('netSalaryDelta', row.page),
      ),
    },
    {
      Header: 'Pension contributions',
      accessor: 'pensionContributions',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { pensionContributions, pensionContributionsDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(pensionContributions)}
            valueDelta={pensionContributionsDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('pensionContributions', row.page),
        getSumForTotal('pensionContributionsDelta', row.page),
      ),
    },
    {
      Header: 'Medical contributions',
      accessor: 'medicalContributions',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { medicalContributions, medicalContributionsDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(medicalContributions)}
            valueDelta={medicalContributionsDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('medicalContributions', row.page),
        getSumForTotal('medicalContributionsDelta', row.page),
      ),
    },
    {
      Header: 'Social insurance contributions',
      accessor: 'socialInsuranceContributions',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { socialInsuranceContributions, socialInsuranceContributionsDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(socialInsuranceContributions)}
            valueDelta={socialInsuranceContributionsDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('socialInsuranceContributions', row.page),
        getSumForTotal('socialInsuranceContributionsDelta', row.page),
      ),
    },
    {
      Header: 'Injury contributions',
      accessor: 'injuriesContributions',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { injuriesContributions, injuriesContributionsDelta } = row.original;

        return (
          <RedactComponent
            value={formatMoney(injuriesContributions)}
            valueDelta={injuriesContributionsDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('injuriesContributions', row.page),
        getSumForTotal('injuriesContributionsDelta', row.page),
      ),
    },
    {
      Header: 'Accounting',
      accessor: 'accountingCostPerMonth',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { accountingPerMonth, accountingPerMonthDelta } = row.original;
        return (
          <RedactComponent
            value={formatMoney(accountingPerMonth)}
            valueDelta={accountingPerMonthDelta}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('accountingPerMonth', row.page),
        getSumForTotal('accountingPerMonthDelta', row.page),
      ),
    },
    {
      Header: 'Parking',
      accessor: 'parkingCostPerMonth',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const {
          parkingCostPerMonth, parkingCostPerMonthDelta, id: employeeId, employmentType, ratePerHour, pay,
        } = row.original;

        return (
          <RedactComponent
            value={formatMoney(parkingCostPerMonth)}
            valueDelta={parkingCostPerMonthDelta}
            onChange={(parkingCostPerMonth: number) => {
              updateEmployeesAsync({
                employeeId, ratePerHour, pay, employmentType, parkingCostPerMonth,
              });
            }}
            isEditable
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('parkingCostPerMonth', row.page),
        getSumForTotal('parkingCostPerMonthDelta', row.page),
      ),
    },
  ];

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Analytics</DefaultCardHeader>
      )}
    >
      <div className="analitycs-page--btns" data-testid="content-card">
        <Button onClick={() => { loadEmployeesAsync(); }}>Reset changes</Button>
        <div>
          {Object.entries(checkFormatColumnsData).map(([value, label]) => (
            <CheckField
              key={value}
              style={{
                marginLeft: 16,
              }}
              viewType="radio"
              label={label}
              checked={value === selectedViewColumns}
              onChange={() => {
                setSelectedViewColumns(value);
              }}
            />
          ))}
        </div>
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
          actions={[
            {
              name: 'duplicate-row-action',
              show: () => true,
              renderText: () => 'Duplicate',
              onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<GetPreviewType>) => {
                const { original } = row;
                duplicateEmployee(original);
              },
            },
            {
              name: 'delete-row-action',
              show: () => true,
              renderText: () => 'Delete',
              onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<GetPreviewType>) => { deleteEmployee(row.original.id); },
            },
          ]}
          columns={selectedViewColumns === '1' ? columnForAll : columnForMain}
        />
      </div>

    </ContentCard>
  );

  function getSumForTotal(key: string, data: SumTotal[]) {
    const sum = data.map((el) => el.original[key as keyof GetPreviewType] as number)
      .reduce((pre: number, current: number) => pre += (current || 0), 0);

    return sum;
  }

  function getTotalCost(sumOfEmployeesValues: number, sumOfEmployeesValuesDelta?: number, isPercent: boolean = false) {
    if (isPercent) {
      sumOfEmployeesValues *= 100;
      sumOfEmployeesValuesDelta = sumOfEmployeesValuesDelta ? sumOfEmployeesValuesDelta * 100 : undefined;
    }

    return (
      <RedactComponent
        value={isPercent ? `${Number(sumOfEmployeesValues.toFixed(2))}%` : formatMoney(Number(sumOfEmployeesValues.toFixed(2)))}
        valueDelta={sumOfEmployeesValuesDelta ? Number(sumOfEmployeesValuesDelta.toFixed(2)) : undefined}
      />
    );
  }

  function duplicateEmployee(data: GetPreviewType) {
    let update: GetPreviewType = data;

    for (const el of Object.keys(data)) {
      if (el.toLowerCase().includes('delta')) {
        update = {
          ...update,
          [el]: 0,
        };
      } else {
        update = {
          ...update,
          [el]: data[el as keyof GetPreviewType],
        };
      }
    }

    update = {
      ...update,
      id: `${data.id}_duplicate`,
      fullName: `(Copy)\n ${update.fullName}`,
    };

    setEmployees([...employees, update]);
    setInitialEmployees([...initialEmployees, update]);
  }

  async function deleteEmployee(idEmployee: number | string) {
    const copyEmployee = employees.find((el) => el.id === idEmployee);
    const copyEmployeeInitial = initialEmployees.find((el) => el.id === idEmployee);

    if (copyEmployee) {
      let newEmployees = employees.slice();
      newEmployees.splice(employees.indexOf(copyEmployee), 1);

      setEmployees(newEmployees);

      // todo
      newEmployees = initialEmployees.slice();
      newEmployees.splice(initialEmployees.indexOf(copyEmployeeInitial!), 1);

      setInitialEmployees(newEmployees);
    }
  }

  function getDeltaForEmployee(oldData:GetPreviewType, newData:GetPreviewType): GetPreviewType {
    let update: GetPreviewType = newData;

    for (const el of Object.keys(oldData)) {
      if (newData[el as keyof GetPreviewType] !== oldData[el as keyof GetPreviewType]) {
        update = {
          ...update,
          [`${el}Delta`]: Number(newData[el as keyof GetPreviewType]) - Number(oldData[el as keyof GetPreviewType]),
        };
      }
    }

    return update;
  }

  async function updateEmployeesAsync(employee: PutPreviewType) {
    const { data } = await api.post<GetPreviewType>(`${LINK_TO_SALARY_SERVICE}finance/get-preview`, employee);

    const index = employees.find((el) => el.id === employee.employeeId);
    const indexInitial = initialEmployees.find((el) => el.id === employee.employeeId);

    if (index) {
      const newemp = employees.slice();
      newemp[newemp.indexOf(index)] = getDeltaForEmployee(indexInitial!, { ...data, fullName: index.fullName, id: index.id });

      setEmployees(newemp);
    }
  }

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.get<GetPreviewType[]>(`${LINK_TO_SALARY_SERVICE}finance/get-analytic`);
      console.log('KEEEEEEEK', data);

      setEmployees(data);
      setInitialEmployees(data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }
}

export default AnalyticsPageTable;
