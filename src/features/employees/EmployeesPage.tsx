/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import {
  useState,
  useEffect,
} from 'react';
import {
  Button,
} from '@tourmalinecore/react-tc-ui-kit';
import { useNavigate } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';
import { EmployeeProps, dataEmployeees } from './employeesData';
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
  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
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
            data={employees}
            order={{
              id: 'weightForSorting',
              desc: true,
            }}
            renderMobileTitle={(row : Row<{ surname: string }>) => row.original.surname}
            enableTableStatePersistance
            maxStillMobileBreakpoint={1200}
            isStriped
            actions={[
              {
                name: 'edit-row-action',
                show: () => true,
                renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
                renderText: () => 'Edit',
                onClick: () => { navigate('/employees/edit-contact&'); },
              },
            ]}
            columns={[
              {
                Header: 'Employee',
                accessor: 'surname',
                // Use our custom `fuzzyText` filter on this column
                filter: 'fuzzyText',
                nonMobileColumn: true,
                principalFilterableColumn: true,
                Cell: ({ row }: Table<EmployeeProps>) => {
                  const { surname, name, middleName } = row.original;
                  return (<div>{`${name} ${surname} ${middleName}`}</div>);
                },
              },
              {
                Header: 'Corporate Email',
                accessor: 'workEmail',
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
                Cell: ({ row }: Table<EmployeeProps>) => {
                  const { phone } = row.original;
                  const phoneChange = phone || 'Not specified';
                  return (<div>{phoneChange}</div>);
                },
              },
              {
                Header: 'GitHub',
                accessor: 'github',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<EmployeeProps>) => {
                  const { github } = row.original;
                  const githubChange = github || 'Not specified';
                  return (<div>{githubChange}</div>);
                },
              },
              {
                Header: 'GitLab',
                accessor: 'gitlab',
                disableFilters: true,
                disableSortBy: true,
                Cell: ({ row }: Table<EmployeeProps>) => {
                  const { gitlab } = row.original;
                  const gitlabChange = gitlab || 'Not specified';
                  return (<div>{gitlabChange}</div>);
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
            data={employees}
            order={{
              id: 'weightForSorting',
              desc: true,
            }}
            renderMobileTitle={(row : Row<{ surname: string }>) => row.original.surname}
            enableTableStatePersistance
            maxStillMobileBreakpoint={1200}
            isStriped
            actions={[
              {
                name: 'edit-row-action',
                show: () => true,
                renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
                renderText: () => 'Edit',
                onClick: () => { navigate('/employees/edit-salary&'); },
              },
            ]}
            columns={[
              {
                Header: 'Employee',
                accessor: 'surname',
                // Use our custom `fuzzyText` filter on this column
                filter: 'fuzzyText',
                nonMobileColumn: true,
                principalFilterableColumn: true,
                Cell: ({ row }: Table<EmployeeProps>) => {
                  const { surname, name, middleName } = row.original;
                  return (<div>{`${name} ${surname} ${middleName}`}</div>);
                },

              },
              {
                Header: 'Rate per hour',
                accessor: 'rateHour',
                disableFilters: true,
                disableSortBy: true,
              },
              {
                Header: 'Pay',
                accessor: 'pay',
                disableFilters: true,
                disableSortBy: true,
              },
              {
                Header: 'Employment Type',
                accessor: 'employmentType',
                disableFilters: true,
                disableSortBy: true,
              },
              {
                Header: 'Net Salary',
                accessor: 'netSalary',
                disableFilters: true,
                disableSortBy: true,
              },
              {
                Header: 'Parking',
                accessor: 'parking',
                disableFilters: true,
                disableSortBy: true,
              },
            ]}
          />
        </div>
      </ContentCard>
    </>
  );

  async function loadEmployeesAsync() {
    try {
      const { data } = await api.get<EmployeeProps[]>('finances/get-contact-information');

      setEmployees(data);
    } catch {
      setEmployees(dataEmployeees);
    }
  }
}

export default EmployeesPage;
