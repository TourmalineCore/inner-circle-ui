/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import {
  Button, CheckField,
} from '@tourmalinecore/react-tc-ui-kit';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import {
  AnalyticsType, CellTable, ColumnType, Metrics, GetTableType, Row,
} from './types/AnalyticsPageTable';
import RedactComponent from '../RedactComponent/RedactComponent';

const checkFormatColumnsData = {
  1: 'All',
  2: 'Main parameters',
};

const employeeWorkingHours = {
  1: 'Half Time',
  2: 'Full Time',
};

const employmentType = {
  1: 'Freelance',
  2: 'Officially',
};

function AnalyticsPageTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedViewColumns, setSelectedViewColumns] = useState('2');
  const [employees, setEmployees] = useState<AnalyticsType>({
    // @ts-ignore
    total: {},
    rows: [],
  });

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  const columnForMain: ColumnType[] = [
    {
      Header: 'Employee',
      accessor: 'employeeFullName',
      minWidth: 300,
      Footer: () => (
        <div className="analytics-page-table__total">
          {employees.rows.length}
          {' '}
          column total
        </div>
      ),
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { employeeFullName } = row.original;

        return (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {employeeFullName}
          </div>
        );
      },
    },
    {
      Header: 'Employed',
      accessor: (row) => Number(row.metrics.isEmployedOfficially),
      disableFilters: true,
      minWidth: 170,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics } = row.original;

        return (
          <div>
            <select
              value={Number(metrics.isEmployedOfficially)}
              className="analytics-page-table__select"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                event.preventDefault();

                const isEmployedOfficially = Boolean(Number(event.target.value));

                return updateEmployeesAsync({ ...row.original, metrics: { ...metrics, isEmployedOfficially } });
              }}
            >
              <option value={0}>{employmentType[1]}</option>
              <option value={1}>{employmentType[2]}</option>
            </select>
          </div>
        );
      },
    },
    {
      Header: 'Rate/h',
      accessor: (row) => row.metrics.ratePerHour,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            isPositiveDeltaGoodForClient={false}
            value={metrics.ratePerHour}
            valueDelta={metricsDiff?.ratePerHour}
            onChange={(ratePerHour: number) => {
              updateEmployeesAsync({ ...row.original, metrics: { ...metrics, ratePerHour } });
            }}
            isEditable
          />
        );
      },
    },
    {
      Header: 'Pay',
      accessor: (row) => row.metrics.pay,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.pay}
            valueDelta={metricsDiff?.pay}
            onChange={(pay: number) => {
              updateEmployeesAsync({ ...row.original, metrics: { ...metrics, pay } });
            }}
            isEditable
          />
        );
      },
    },
    {
      Header: 'Employment type',
      accessor: (row) => row.metrics.employmentType,
      disableFilters: true,
      minWidth: 240,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics } = row.original;

        return (
          <div>
            <select
              value={metrics.employmentType}
              className="analytics-page-table__select"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                event.preventDefault();
                const employmentType = Number(event.target.value);

                return updateEmployeesAsync({ ...row.original, metrics: { ...metrics, employmentType } });
              }}
            >
              <option value={0.5}>{employeeWorkingHours[1]}</option>
              <option value={1}>{employeeWorkingHours[2]}</option>
            </select>
          </div>
        );
      },
    },
    {
      Header: 'Salary',
      accessor: (row) => row.metrics.salary,
      disableFilters: true,
      minWidth: 180,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.salary}
            valueDelta={metricsDiff?.salary}
          />
        );
      },
    },
    {
      Header: 'Hourly Cost (By Fact)',
      accessor: (row) => row.metrics.hourlyCostFact,
      disableFilters: true,
      minWidth: 250,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.hourlyCostFact}
            valueDelta={metricsDiff?.hourlyCostFact}
          />
        );
      },
    },
    {
      Header: 'Hourly Cost (On Hand)',
      accessor: (row) => row.metrics.hourlyCostHand,
      disableFilters: true,
      minWidth: 250,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.hourlyCostHand}
            valueDelta={metricsDiff?.hourlyCostHand}
          />
        );
      },
    },
    {
      Header: 'Earnings',
      accessor: (row) => row.metrics.earnings,
      disableFilters: true,
      minWidth: 200,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            isPositiveDeltaGoodForClient={false}
            value={metrics.earnings}
            valueDelta={metricsDiff?.earnings}
          />
        );
      },
      Footer: () => <TableFooter value="earnings" isPositiveDeltaGoodForClient={false} />,
    },
    {
      Header: 'Expenses',
      accessor: (row) => row.metrics.expenses,
      disableFilters: true,
      minWidth: 200,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.expenses}
            valueDelta={metricsDiff?.expenses}
          />
        );
      },
      Footer: () => <TableFooter value="expenses" />,
    },
    {
      Header: 'Profit',
      accessor: (row) => row.metrics.profit,
      disableFilters: true,
      minWidth: 200,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            isPositiveDeltaGoodForClient={false}
            value={metrics.profit}
            valueDelta={metricsDiff?.profit}
          />
        );
      },
      Footer: () => <TableFooter value="profit" isPositiveDeltaGoodForClient={false} />,
    },
    {
      Header: 'Profitability',
      accessor: (row) => row.metrics.profitAbility,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            isPositiveDeltaGoodForClient={false}
            value={metrics.profitAbility}
            valueDelta={metricsDiff?.profitAbility}
            isPercent
          />
        );
      },
      Footer: () => <TableFooter value="profitAbility" isPositiveDeltaGoodForClient={false} isPercent />,
    },
  ];

  const columnForAll: ColumnType[] = [
    ...columnForMain,
    {
      Header: 'District coefficient',
      accessor: (row) => row.metrics.districtCoefficient,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.districtCoefficient}
            valueDelta={metricsDiff?.districtCoefficient}
          />
        );
      },
    },
    {
      Header: 'Gross salary',
      accessor: (row) => row.metrics.grossSalary,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.grossSalary}
            valueDelta={metricsDiff?.grossSalary}
          />
        );
      },
    },
    {
      Header: 'Prepayment',
      accessor: (row) => row.metrics.prepayment,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.prepayment}
            valueDelta={metricsDiff?.prepayment}
          />
        );
      },
      Footer: () => <TableFooter value="prepayment" />,
    },
    {
      Header: 'Income tax',
      accessor: (row) => row.metrics.incomeTaxContributions,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.incomeTaxContributions}
            valueDelta={metricsDiff?.incomeTaxContributions}
          />
        );
      },
      Footer: () => <TableFooter value="incomeTaxContributions" />,
    },
    {
      Header: 'Net Salary',
      accessor: (row) => row.metrics.netSalary,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.netSalary}
            valueDelta={metricsDiff?.netSalary}
          />
        );
      },
      Footer: () => <TableFooter value="netSalary" />,
    },
    {
      Header: 'Pension contributions',
      accessor: (row) => row.metrics.pensionContributions,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.pensionContributions}
            valueDelta={metricsDiff?.pensionContributions}
          />
        );
      },
      Footer: () => <TableFooter value="pensionContributions" />,
    },
    {
      Header: 'Medical contributions',
      accessor: (row) => row.metrics.medicalContributions,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.medicalContributions}
            valueDelta={metricsDiff?.medicalContributions}
          />
        );
      },
      Footer: () => <TableFooter value="medicalContributions" />,
    },
    {
      Header: 'Social insurance contributions',
      accessor: (row) => row.metrics.socialInsuranceContributions,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.socialInsuranceContributions}
            valueDelta={metricsDiff?.socialInsuranceContributions}
          />
        );
      },
      Footer: () => <TableFooter value="socialInsuranceContributions" />,
    },
    {
      Header: 'Injury contributions',
      accessor: (row) => row.metrics.injuriesContributions,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;

        return (
          <RedactComponent
            value={metrics.injuriesContributions}
            valueDelta={metricsDiff?.injuriesContributions}
          />
        );
      },
      Footer: () => <TableFooter value="injuriesContributions" />,
    },
    {
      Header: 'Accounting',
      accessor: (row) => row.metrics.accountingCostPerMonth,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const { metrics, metricsDiff } = row.original;
        return (
          <RedactComponent
            value={metrics.accountingPerMonth}
            valueDelta={metricsDiff?.accountingPerMonth}
          />
        );
      },
      Footer: () => <TableFooter value="accountingPerMonth" />,
    },
    {
      Header: 'Parking',
      accessor: (row) => row.metrics.parkingCostPerMonth,
      disableFilters: true,
      Cell: ({ row }: CellTable<GetTableType>) => {
        const {
          metrics, metricsDiff,
        } = row.original;

        return (
          <RedactComponent
            value={metrics.parkingCostPerMonth}
            valueDelta={metricsDiff?.parkingCostPerMonth}
            onChange={(parkingCostPerMonth: number) => {
              updateEmployeesAsync({ ...row.original, metrics: { ...metrics, parkingCostPerMonth } });
            }}
            isEditable
          />
        );
      },
      Footer: () => <TableFooter value="parkingCostPerMonth" />,
    },
  ];

  return (
    <>
      <h2 className="heading">Analytics</h2>

      <div className="analytics-page-table__buttons">
        <Button
          className="analytics-page-table__button"
          onClick={() => { loadEmployeesAsync(); }}
        >
          Reset changes
        </Button>
        <div className="analytics-page-table__checkbox">
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
          data={employees.rows}
          order={{
            id: 'weightForSorting',
            desc: true,
          }}
          loading={isLoading}
          renderMobileTitle={(row : Row<{ employeeFullName: string }>) => row.original.employeeFullName}
          enableTableStatePersistance
          maxStillMobileBreakpoint={800}
          actions={[
            {
              name: 'duplicate-row-action',
              show: () => true,
              renderText: () => 'Duplicate',
              onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<GetTableType>) => {
                const { original } = row;
                duplicateEmployee(original);
              },
            },
            {
              name: 'delete-row-action',
              show: () => true,
              renderText: () => 'Delete',
              onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<GetTableType>) => { deleteEmployee(row.original); },
            },
          ]}
          columns={selectedViewColumns === '1' ? columnForAll : columnForMain}
        />
      </div>

    </>
  );

  async function duplicateEmployee(employee: GetTableType) {
    const copyEmployee = {
      ...employee,
      employeeId: `${employee.employeeId}__copy`,
      employeeFullName: `${employee.employeeFullName} (Copy)`,
      isCopy: true,
    };

    const newData = [...employees.rows, copyEmployee];

    try {
      const { data } = await api.post<AnalyticsType>(`${LINK_TO_SALARY_SERVICE}finance/get-analytics`, mappingData(newData));

      setEmployees(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteEmployee(employee: GetTableType) {
    setIsLoading(true);

    const newData = [...employees.rows.filter((row) => employee.employeeId !== row.employeeId)];

    try {
      const { data } = await api.post<AnalyticsType>(`${LINK_TO_SALARY_SERVICE}finance/get-analytics`, mappingData(newData));

      setEmployees(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function TableFooter({
    value,
    isPercent = false,
    isPositiveDeltaGoodForClient = true,
  }: {
    value: keyof Metrics;
    isPercent?: boolean;
    isPositiveDeltaGoodForClient?: boolean;
  }) {
    return (
      <RedactComponent
        isPositiveDeltaGoodForClient={isPositiveDeltaGoodForClient}
        // @ts-ignore
        value={employees.total.metrics[value]}
        // @ts-ignore
        valueDelta={employees.total.metricsDiff?.[value]}
        className="analytics-page-table__total"
        isPercent={isPercent}
      />
    );
  }

  async function updateEmployeesAsync(employee: GetTableType) {
    setIsLoading(true);

    const newData = [...employees.rows.map((row) => {
      if (row.employeeId === employee.employeeId) {
        return employee;
      }

      return row;
    })];

    try {
      const { data } = await api.post<AnalyticsType>(`${LINK_TO_SALARY_SERVICE}finance/get-analytics`, mappingData(newData));

      setEmployees(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  function mappingData(data: GetTableType[]) {
    return data.map((item) => ({
      employeeId: item.employeeId,
      employeeFullName: item.employeeFullName,
      ratePerHour: item.metrics.ratePerHour,
      pay: item.metrics.pay,
      employmentType: item.metrics.employmentType,
      parkingCostPerMonth: item.metrics.parkingCostPerMonth,
      isCopy: item.isCopy,
      isEmployedOfficially: item.metrics.isEmployedOfficially,
    }));
  }

  async function loadEmployeesAsync() {
    setIsLoading(true);

    try {
      const { data } = await api.post<AnalyticsType>(`${LINK_TO_SALARY_SERVICE}finance/get-analytics`, []);

      setEmployees(data);
    } finally {
      setIsLoading(false);
    }
  }
}

export default AnalyticsPageTable;
