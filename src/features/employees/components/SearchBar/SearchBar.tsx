import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext } from 'react';
import EmployeesStateContext from '../../context/EmployeesStateContext';

function SearchBar() {
  const employeesState = useContext(EmployeesStateContext);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search for employee.."
        onChange={searchHandler}
      />
    </div>
  );

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    employeesState.updateSearchTerm(event.target.value);
  }
}

export default observer(SearchBar);
