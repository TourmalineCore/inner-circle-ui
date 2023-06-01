import {
  MouseEvent, useContext, useEffect,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import EmployeesStateContext from '../../context/EmployeesStateContext';

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

function FilterMenu() {
  const employeesState = useContext(EmployeesStateContext);

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (employeesState.filterTerm === 'blank' && !employeesState.isBlankEmployees) {
      params.delete('filter');
      setParams(params, {
        replace: true,
      });
    }
  }, [employeesState.isBlankEmployees, employeesState.filterTerm]);

  useEffect(() => {
    employeesState.updateFilterTerm(params.get('filter') || 'current');
  }, [employeesState.filterTerm]);

  return (
    <div className="filter-menu">
      {filterElements.map((item) => (
        <Button
          type="button"
          className={clsx('filter-menu__button', {
            'filter-menu__button--active': item.id === employeesState.filterTerm,
            'is-hidden': !employeesState.isBlankEmployees && item.id === 'blank',
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

    employeesState.updateFilterTerm(event.currentTarget.id);
  }
}

export default observer(FilterMenu);
