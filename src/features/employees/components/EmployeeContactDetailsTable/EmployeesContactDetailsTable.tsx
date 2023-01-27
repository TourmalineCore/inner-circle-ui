/* eslint-disable react/no-unstable-nested-components */
import { ClientTable } from '@tourmalinecore/react-table-responsive';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  MouseEventHandler,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { ColleagueContactsType, ColleagueFinancesDtoType } from '../../types';
import { api } from '../../../../common/api';
import { LINK_TO_SALARY_SERVICE } from '../../../../common/config/config';
import ContactLink from '../../../../components/ContactLink/ContactLink';

type Row<Type> = {
  original: Type
};
type Table<TypeProps> = {
  row: {
    original: TypeProps;
  }
};

function EmployeesContactDetailsTable({
  employeesContact = [],
  loadEmployeesAsync,
}:{
  employeesContact: ColleagueContactsType[];
  loadEmployeesAsync: () => unknown
}) {
  const navigate = useNavigate();

  return (
    <ClientTable
      tableId="tc-story-bonus-table"
      data={employeesContact}
      order={{
        id: 'weightForSorting',
        desc: true,
      }}
      renderMobileTitle={(row: Row<{ fullName: string }>) => row.original.fullName}
      enableTableStatePersistance
      maxStillMobileBreakpoint={1200}
      actions={[
        {
          name: 'edit-row-action',
          show: () => true,
          renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
          renderText: () => 'Edit',
          onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<ColleagueContactsType>) => {
            navigate(`/employees/edit?id=${row.original.id}`);
          },
        },
        {
          name: 'delete-row-action',
          show: () => true,
          renderIcon: () => <FontAwesomeIcon icon={faTrash} />,
          renderText: () => 'Delete',
          onClick: (e: MouseEventHandler<HTMLInputElement>, row: Row<ColleagueFinancesDtoType>) => {
            deleteEmployeesAsync(row.original.id);
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
          Cell: ({ row }: Table<ColleagueContactsType>) => {
            const { corporateEmail } = row.original;
            return <ContactLink contact={corporateEmail} link={corporateEmail} />;
          },
        },
        {
          Header: 'Personal Email',
          accessor: 'personalEmail',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueContactsType>) => {
            const { personalEmail } = row.original;
            return <ContactLink contact={personalEmail} link={personalEmail} />;
          },
        },
        {
          Header: 'Phone',
          accessor: 'phone',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueContactsType>) => {
            const { phone } = row.original;
            return <ContactLink contact={phone} link={`tel:${phone}`} />;
          },
        },
        {
          Header: 'GitHub',
          accessor: 'gitHub',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueContactsType>) => {
            const { gitHub } = row.original;
            return <ContactLink contact={gitHub} link={`https://github.com/${gitHub}`} />;
          },
        },
        {
          Header: 'GitLab',
          accessor: 'gitLab',
          disableFilters: true,
          disableSortBy: true,
          Cell: ({ row }: Table<ColleagueContactsType>) => {
            const { gitLab } = row.original;
            return <ContactLink contact={gitLab} link={`https://gitlab.com/${gitLab}`} />;
          },
        },
      ]}
    />
  );

  async function deleteEmployeesAsync(id: number) {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const isDelete = confirm('Удалить сотрудника?');

    if (isDelete) {
      await api.delete(`${LINK_TO_SALARY_SERVICE}employees/delete/${id}`);
      await loadEmployeesAsync();
    }
  }
}

export default EmployeesContactDetailsTable;
