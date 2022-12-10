/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import {
  Button,
} from '@tourmalinecore/react-tc-ui-kit';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';

import { useNavigate } from 'react-router-dom';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import {
  ColleagueContactsType, ColleagueFinancesDtoType, ColleaguesType, EmployeeTypeSwitch,
} from './types/index';

import { formatMoney } from '../../common/utils/formatMoney';
import { api } from '../../common/api';

type Row<Type> = {
  original: Type
};
type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function EmployeesPage() {
  const navigate = useNavigate();
  const [employeesContact, setEmployeesContact] = useState<ColleagueContactsType[]>([]);
  const [employeesSalary, setEmployeesSalary] = useState<ColleagueFinancesDtoType[]>([]);

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <>
      <ContentCard
        style={{ margin: 20 }}
        isStickyHead
        headerContent={(
          <DefaultCardHeader>Contact details</DefaultCardHeader>
        )}
      >
        <div style={{ paddingTop: 4 }}>
          <ClientTable
            tableId="tc-story-bonus-table"
            data={employeesContact}
            order={{
              id: 'weightForSorting',
              desc: true,
            }}
            renderMobileTitle={(row : Row<{ fullName: string }>) => row.original.fullName}
            enableTableStatePersistance
            maxStillMobileBreakpoint={1200}
            isStriped
            actions={[
              {
                name: 'edit-row-action',
                show: () => true,
                renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
                renderText: () => 'Edit',
                onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<ColleagueContactsType>) => {
                  navigate(`/employees/edit-contact&${Number(row.original.id)}`);
                },
              },
            ]}
            columns={[
              {
                Header: 'Employee',
                accessor: 'fullName',
                // Use our custom `fuzzyText` filter on this column
                filter: 'fuzzyText',
                nonMobileColumn: true,
                principalFilterableColumn: true,
              },
              {
                Header: 'Corporate Email',
                accessor: 'corporateEmail',
                disableFilters: true,
                disableSortBy: true,
                minWidth: 250,
              },
              {
                Header: 'Personal Email',
                accessor: 'personalEmail',
                disableFilters: true,
                disableSortBy: true,
              },
              {
                Header: 'Phone',
                accessor: 'phone',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueContactsType>) => {
                  const { phone } = row.original;
                  const phoneChange = phone || 'Not specified';
                  return (<div>{phoneChange}</div>);
                },
              },
              {
                Header: 'GitHub',
                accessor: 'gitHub',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueContactsType>) => {
                  const { gitHub } = row.original;
                  const gitHubChange = gitHub || 'Not specified';
                  return (<div>{gitHubChange}</div>);
                },
              },
              {
                Header: 'GitLab',
                accessor: 'gitLab',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueContactsType>) => {
                  const { gitLab } = row.original;
                  const gitLabChange = gitLab || 'Not specified';
                  return (<div>{gitLabChange}</div>);
                },
              },
            ]}
          />
        </div>
        <Button
          style={{ marginTop: 20 }}
          onClick={() => { navigate('/employees/add'); }}
        >
          Аdd an employee

        </Button>
      </ContentCard>
      <ContentCard
        style={{ margin: 20 }}
        isStickyHead
        headerContent={(
          <DefaultCardHeader>Salary data</DefaultCardHeader>
        )}
      >
        <div className="table" style={{ paddingTop: 4 }}>
          <ClientTable
            tableId="tc-story-bonus-table"
            data={employeesSalary}
            order={{
              id: 'weightForSorting',
              desc: true,
            }}
            renderMobileTitle={(row : Row<{ fullName: string }>) => row.original.fullName}
            enableTableStatePersistance
            maxStillMobileBreakpoint={1200}
            isStriped
            actions={[
              {
                name: 'edit-row-action',
                show: () => true,
                renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
                renderText: () => 'Edit',
                onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<ColleagueFinancesDtoType>) => {
                  navigate(`/employees/edit-salary&${Number(row.original.id)}`);
                },
              },
            ]}
            columns={[
              {
                Header: 'Employee',
                accessor: 'fullName',
                // Use our custom `fuzzyText` filter on this column
                filter: 'fuzzyText',
                nonMobileColumn: true,
                principalFilterableColumn: true,
              },
              {
                Header: 'Rate per hour',
                accessor: 'ratePerHour',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
                  const { ratePerHour } = row.original;
                  return (<div>{formatMoney(ratePerHour)}</div>);
                },
              },
              {
                Header: 'Pay',
                accessor: 'pay',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
                  const { pay } = row.original;
                  return (<div>{formatMoney(pay)}</div>);
                },
              },
              {
                Header: 'Employment Type',
                accessor: 'employmentType',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
                  const { employmentType } = row.original;
                  return (<div>{EmployeeTypeSwitch[employmentType]}</div>);
                },
              },
              {
                Header: 'Net Salary',
                accessor: 'netSalary',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
                  const { netSalary } = row.original;
                  return (<div>{formatMoney(netSalary)}</div>);
                },
              },
              {
                Header: 'Parking',
                accessor: 'parking',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<ColleagueFinancesDtoType>) => {
                  const { parking } = row.original;
                  return (<div>{formatMoney(parking)}</div>);
                },
              },
            ]}
          />
        </div>
      </ContentCard>
    </>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<ColleaguesType>('employees/get-colleagues');
    setEmployeesContact(data.colleagueContacts);
    setEmployeesSalary(data.colleagueFinancesDto);
  }
}

export default EmployeesPage;
