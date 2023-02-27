import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { ChangeEvent, SetStateAction } from 'react';

function SearchBar({
  setEmployees,
}: {
  setEmployees: (employee: SetStateAction<string>) => void;
}) {
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployees(event.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for employee.."
        onChange={searchHandler}
      />
    </div>
  );
}

export default SearchBar;
