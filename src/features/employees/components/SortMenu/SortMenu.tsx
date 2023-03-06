import {
  useState, useEffect, useContext,
} from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';
import EmployeesStateContext from '../../context/EmployeesStateContext';

function SortMenu() {
  const [count, setCount] = useState<number>(0);

  const employeesState = useContext(EmployeesStateContext);

  const sortHandler = () => {
    if (count > 2) {
      setCount(0);
    }

    setCount((prev) => prev += 1);
  };

  useEffect(() => {
    getSortElement();
  }, [count]);

  function getSortElement() {
    switch (count) {
      case 1: {
        employeesState.updateSortTerm('asc');

        break;
      }
      case 2: {
        employeesState.updateSortTerm('desc');

        break;
      }
      default: {
        employeesState.updateSortTerm('default');

        break;
      }
    }
  }

  return (
    <div className="sort-menu">
      <Button
        type="button"
        id={employeesState.sortTerm}
        onClick={sortHandler}
      >
        <span className="sort-menu__inner">
          Sort by Name
          <div className="sort-menu__box">
            <span className={clsx({ 'sort-menu__unselected': employeesState.sortTerm === 'desc' })}>
              ▲
            </span>
            <span className={clsx({ 'sort-menu__unselected': employeesState.sortTerm === 'asc' })}>
              ▼
            </span>
          </div>
        </span>
      </Button>
    </div>
  );
}

export default SortMenu;
