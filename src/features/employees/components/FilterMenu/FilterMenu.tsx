import {
  MouseEvent, SetStateAction, useEffect, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';

const filterElements = [
  {
    id: 'all',
    name: 'View All',
  },
  {
    id: 'current',
    name: 'Current Employees',
  },
  {
    id: 'fired',
    name: 'Fired Employees',
  },
  {
    id: 'blank',
    name: 'Blank Employees',
  },
];

function FilterMenu({
  isBlankEmployees,
  setFilter,
}: {
  isBlankEmployees: boolean;
  setFilter: (value: SetStateAction<string>) => void;
}) {
  const [params, setParams] = useSearchParams();
  const [filterElement, setFilterElement] = useState(params.get('filter') || 'current');

  useEffect(() => {
    if (filterElement === 'blank' && !isBlankEmployees) {
      params.delete('filter');
      setParams(params, {
        replace: true,
      });
    }
  }, [isBlankEmployees]);

  return (
    <div>
      {filterElements.map((item) => (
        <Button
          type="button"
          className={clsx({
            'button-active': item.id === filterElement,
            'is-hidden': !isBlankEmployees && item.id === 'blank',
          })}
          key={item.id}
          id={item.id}
          onClick={sortHandler}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );

  function sortHandler(event: MouseEvent<HTMLButtonElement>) {
    const buttonId = event.currentTarget.id;

    if (buttonId === 'current') {
      params.delete('filter');
      setParams(params, {
        replace: true,
      });
    } else {
      params.set('filter', buttonId);

      setParams(params, {
        replace: true,
      });
    }

    setFilter(event.currentTarget.id);
    setFilterElement(event.currentTarget.id);
  }
}

export default FilterMenu;
