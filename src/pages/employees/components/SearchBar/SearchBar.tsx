import './SearchBar.scss'

import { observer } from 'mobx-react-lite'
import { ChangeEvent, useContext } from 'react'
import { EmployeesStateContext } from '../../state/EmployeesStateContext'

export const SearchBar = observer(() => {
  const employeesState = useContext(EmployeesStateContext)

  return (
    <input
      placeholder="Search for employee.."
      className="search-bar-input"
      type="text"
      data-listener-added_4a42d730="true"
      onChange={searchHandler}
    />
  )

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    employeesState.updateSearchTerm(event.target.value)
  }
})
