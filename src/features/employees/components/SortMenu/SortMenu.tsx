import { SetStateAction, useState, MouseEvent } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';

function SortMenu({
  setEmployees,
}
:{
  setEmployees: (employee: SetStateAction<string>) => void;
}) {
  const [isDess, setIsDess] = useState(false);

  const sortHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setIsDess(!isDess);
    setEmployees(event.currentTarget.id);
  };

  return (
    <Button
      type="button"
      id={isDess ? 'desc' : 'acc'}
      onClick={sortHandler}
    >
      Sort by Name
    </Button>
  );
}

export default SortMenu;
