import { MouseEvent, SetStateAction, useState } from 'react';
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
  setEmployees,
}: {
  setEmployees: (employee: SetStateAction<string>) => void;
}) {
  const [params, setParams] = useSearchParams();
  const [filterElement, setFilterElement] = useState(params.get('filter') || 'current');

  const sortHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const text = event.currentTarget.id;

    if (text === 'current') {
      params.delete('filter');
      setParams(params, {
        replace: true,
      });
    } else {
      params.set('filter', text);

      setParams(params, {
        replace: true,
      });
    }

    setFilterElement(event.currentTarget.id);
    setEmployees(event.currentTarget.id);
  };

  return (
    <div>
      {filterElements.map((item) => (
        <Button
          type="button"
          className={clsx({
            'button-active': item.id === filterElement,
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
}

export default FilterMenu;
