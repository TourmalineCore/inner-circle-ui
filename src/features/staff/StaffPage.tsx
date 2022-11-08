import { ClientTable } from '@tourmalinecore/react-table-responsive';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

import {
  data,
} from './staffData';

type Row<Type> = {
  original: Type
};

function TablePage() {
  // const actions = [
  //   {
  //     name: 'edit-row-action',
  //     show: () => true,
  //     renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
  //     renderText: () => 'Edit Row',
  //   },
  // ];

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Staffers Table</DefaultCardHeader>
      )}
    >
      <div style={{ paddingTop: 4 }}>
        <ClientTable
          tableId="tc-story-bonus-table"
          data={data}
          order={{
            id: 'weightForSorting',
            desc: true,
          }}
          renderMobileTitle={(row : Row<{ employee: string }>) => row.original.employee}
          enableTableStatePersistance
          maxStillMobileBreakpoint={1200}
          isStriped
          columns={[
            {
              Header: 'Employee',
              accessor: 'employee',
              // Use our custom `fuzzyText` filter on this column
              filter: 'fuzzyText',
              nonMobileColumn: true,
              principalFilterableColumn: true,
            },
            {
              Header: 'Email',
              accessor: 'email',
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: 'Phone',
              accessor: 'phone',
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: 'Skype',
              accessor: 'skypeId',
              disableFilters: true,
              disableSortBy: true,
            },
            {
              Header: 'Telegram',
              accessor: 'telegramId',
              disableFilters: true,
              disableSortBy: true,
            },
          ]}
        />
      </div>
    </ContentCard>
  );
}

export default TablePage;
