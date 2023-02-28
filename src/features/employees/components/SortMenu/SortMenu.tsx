/* eslint-disable no-nested-ternary */
import {
  SetStateAction, useState, useEffect,
} from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import clsx from 'clsx';

function SortMenu({
  setSortBy,
}: {
  setSortBy: (value: SetStateAction<string>) => void;
}) {
  const [isDess, setIsDess] = useState<number>(0);
  const [sort, setSort] = useState('');

  const sortHandler = () => {
    if (isDess > 2) {
      setIsDess(0);
    }

    setIsDess((prev) => prev += 1);
  };

  useEffect(() => {
    sortElement();
  }, [isDess]);

  function sortElement() {
    switch (isDess) {
      case 1: {
        setSort('asc');
        setSortBy('asc');

        break;
      }
      case 2: {
        setSort('desc');
        setSortBy('desc');

        break;
      }
      default: {
        setSort('default');
        setSortBy('default');

        break;
      }
    }
  }

  return (
    <div className="sort-menu">
      <Button
        type="button"
        id={sort}
        onClick={sortHandler}
      >
        <span className="sort-menu__inner">
          Sort by Name
          <div className="sort-menu__box">
            <span className={clsx({ 'sort-menu__unselected': sort === 'desc' })}>
              ▲
            </span>
            <span className={clsx({ 'sort-menu__unselected': sort === 'asc' })}>
              ▼
            </span>
          </div>
        </span>
      </Button>
    </div>
  );
}

export default SortMenu;
