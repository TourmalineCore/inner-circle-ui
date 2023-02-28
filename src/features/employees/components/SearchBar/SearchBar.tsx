import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { ChangeEvent, SetStateAction } from 'react';

function SearchBar({
  setSearch,
}: {
  setSearch: (value: SetStateAction<string>) => void;
}) {
  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
