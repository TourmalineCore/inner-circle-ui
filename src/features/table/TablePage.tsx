import { ClientTable, SelectColumnFilter } from '@tourmalinecore/react-table-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import ContentCard from '../../components/ContentCard/ContentCard';
import DefaultCardHeader from '../../components/DefaultCardHeader/DefaultCardHeader';

import {
  all, someTypesOptions, data, someTypesStrings,
} from './tableData';

type Row<Type> = {
  original: Type
};

function TablePage() {
  const actions = [
    {
      name: 'edit-row-action',
      show: () => true,
      renderIcon: () => <FontAwesomeIcon icon={faEdit} />,
      renderText: () => 'Edit Row',
    },
  ];

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <DefaultCardHeader>Responsive Table Demo</DefaultCardHeader>
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
          actions={actions}
          columns={[
            {
              Header: 'Employee',
              accessor: 'employee',
              // Use our custom `fuzzyText` filter on this column
              filter: 'fuzzyText',
              Footer: () => 'Total',
              nonMobileColumn: true,
              principalFilterableColumn: true,
            },
            {
              Header: 'Weight (%)',
              accessor: 'weight',
              width: 140,
              disableFilters: true,
              Footer: () => 100,
            },
            {
              Header: 'Planned',
              accessor: 'plannedSales',
              width: 200,
              disableFilters: true,
              Footer: () => '48 529 957,27',
            },
            {
              Header: 'Previous',
              accessor: 'previousSales',
              width: 200,
              disableSortBy: true,
              disableFilters: true,
              Footer: () => '42 238 542,94',
            },
            {
              Header: 'Actual',
              accessor: 'actualSales',
              width: 200,
              disableSortBy: true,
              disableFilters: true,
              Footer: () => '47 193 196,2',
            },
            {
              Header: 'Target',
              accessor: 'targetAchivementPercent',
              width: 100,
              disableSortBy: true,
              disableFilters: true,
              Footer: () => '97,25',
            },
            {
              Header: 'Forecasting',
              disableFilters: true,
              disableSortBy: true,
              width: 220,
              minWidth: 140,
              id: 'newSlider',
              accessor: 'targetAchivementPercent',
              Cell: () => inputComponent(),
              twoRowsMobileLayout: true,
              noFooterColumn: true,
            },
            {
              Header: 'Bonus',
              id: 'calculatedBonus',
              disableSortBy: true,
              disableFilters: true,
              accessor: ({ forcastedBonus, calculatedBonus }: { forcastedBonus: number; calculatedBonus: number }) => forcastedBonus || calculatedBonus,
              Cell: ({ value }: { value: number }) => value,
              noFooterColumn: true,
            },
            {
              Header: 'Type',
              accessor: 'someType',
              minWidth: 200,
              maxWidth: 400,
              Cell: ({ value }: { value: string }) => someTypesStrings[value],
              Filter: SelectColumnFilter,
              selectFilterOptions: [all, ...someTypesOptions],
              noFooterColumn: true,
            },
          ]}
        />
      </div>
    </ContentCard>
  );

  function inputComponent() {
    return (
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={79}
      />
    );
  }
}

export default TablePage;
