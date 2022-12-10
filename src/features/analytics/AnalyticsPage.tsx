/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import {
  MouseEventHandler, useEffect, useState,
} from 'react';
import {
  Button, CheckField,
} from '@tourmalinecore/react-tc-ui-kit';
import { api } from '../../common/api';
import { formatMoney } from '../../common/utils/formatMoney';
import {
  GetPreviewType,
  PutPreviewType,
} from './types/index';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import RedactComponent from './components/RedactComponent/RedactComponent';

import './AnalyticsPage.css';

type Row<TypeProps> = {
  original: TypeProps
  values: TypeProps;
};

type CellTable<TypeProps> = {
  row: Row<TypeProps>
};

type FooterTable<TypeProps> = {
  page: Array<{
    values: TypeProps;
    original: TypeProps;
  }>;
  filteredRows: Array<{
    values: TypeProps;
    original: TypeProps;
  }>;
};

type ColumnType = {
  Header: string,
  accessor?: string,
  principalFilterableColumn?: boolean,
  disableFilters?: boolean,
  minWidth?: number,
  Footer?: ((row: FooterTable<GetPreviewType>) => JSX.Element) | (() => string),
  Cell?: ({ row }: CellTable<GetPreviewType>) => JSX.Element
};

const checkFormatColumnsData = {
  1: 'All',
  2: 'Main parameters',
};

const employeeTypeData = {
  1: 'Full Time',
  2: 'Half Time',
};

function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
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
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { employmentType } = row.original;

        return <div>{employmentType === 1 ? employeeTypeData[1] : employeeTypeData[2]}</div>;
      },
    },
    {
      Header: 'Salary',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { employmentType, pay, payDelta } = row.original;

        const salary = pay * employmentType;
        const salaryDelta = payDelta ? payDelta * employmentType : undefined;

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
        getSumForTotal('earnings', row.page.map((el) => el.values)),
        getSumForTotal('earningsDelta', row.page.map((el) => el.original)),
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
        getSumForTotal('expenses', row.page.map((el) => el.values)),
        getSumForTotal('expensesDelta', row.page.map((el) => el.original)),
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
        getSumForTotal('profit', row.page.map((el) => el.values)),
        getSumForTotal('profitDelta', row.page.map((el) => el.original)),
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
      Footer: (row: FooterTable<GetPreviewType>) => {
        const sumValue = getSumForTotal('profit', row.page.map((el) => el.values)) / getSumForTotal('earnings', row.page.map((el) => el.values));

        const sumDelta = sumValue - (getSumForTotal('profit', row.page.map((el) => el.values)) - getSumForTotal('profitDelta', row.page.map((el) => el.original)))
        / (getSumForTotal('earnings', row.page.map((el) => el.values)) - getSumForTotal('earningsDelta', row.page.map((el) => el.original)));

        return getTotalCost(
          sumValue,
          sumDelta,
          true,
        );
      },
    },
  ];

  const columnForAll: ColumnType[] = [
    ...columnForMain,
    {
      Header: 'District coefficient',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { employmentType, pay, payDelta } = row.original;

        const salary = pay * employmentType * 0.15;
        const salaryDelta = payDelta ? payDelta * employmentType * 0.15 : undefined;

        return (
          <RedactComponent
            value={formatMoney(salary)}
            valueDelta={salaryDelta}
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
        getSumForTotal('prepayment', row.page.map((el) => el.values)),
        getSumForTotal('prepaymentDelta', row.page.map((el) => el.original)),
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
        getSumForTotal('incomeTaxContributions', row.page.map((el) => el.values)),
        getSumForTotal('incomeTaxContributionsDelta', row.page.map((el) => el.original)),
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
        getSumForTotal('netSalary', row.page.map((el) => el.values)),
        getSumForTotal('netSalaryDelta', row.page.map((el) => el.original)),
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
        getSumForTotal('pensionContributions', row.page.map((el) => el.values)),
        getSumForTotal('pensionContributionsDelta', row.page.map((el) => el.original)),
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
        getSumForTotal('medicalContributions', row.page.map((el) => el.values)),
        getSumForTotal('medicalContributionsDelta', row.page.map((el) => el.original)),
      ),
    },
    {
      Header: 'Social insurance contributions',
      accessor: 'socialInsuranceContributions',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { socialInsuranceContributions } = row.original;

        return (
          <RedactComponent
            value={formatMoney(socialInsuranceContributions)}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('socialInsuranceContributions', row.page.map((el) => el.original)),
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
        getSumForTotal('injuriesContributions', row.page.map((el) => el.values)),
        getSumForTotal('injuriesContributionsDelta', row.page.map((el) => el.original)),
      ),
    },
    {
      Header: 'Accounting',
      disableFilters: true,
      Cell: () => (

        <RedactComponent
          value={formatMoney(600)}
        />
      ),
    },
    {
      Header: 'Parking',
      accessor: 'parkingCostPerMonth',
      disableFilters: true,
      Cell: ({ row }: CellTable<GetPreviewType>) => {
        const { parkingCostPerMonth } = row.original;

        return (
          <RedactComponent
            value={formatMoney(parkingCostPerMonth)}
          />
        );
      },
      Footer: (row: FooterTable<GetPreviewType>) => getTotalCost(
        getSumForTotal('parkingCostPerMonth', row.page.map((el) => el.original)),
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
      <div className="analitycs-page--btns">
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
          isStriped
          actions={[
            {
              name: 'edit-row-action',
              show: () => true,
              renderText: () => 'Dublicate',
              onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<GetPreviewType>) => { dublicateEmployee(row.original.id); },
            },
            {
              name: 'edit-row-action',
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

  function getSumForTotal(key: string, data : GetPreviewType[]) {
    const sum = data.map((el) => el[key as keyof GetPreviewType] as number)
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
