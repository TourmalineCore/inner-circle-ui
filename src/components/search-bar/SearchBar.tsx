import './SearchBar.scss'

import SearchIcon from '../../assets/icons/icon-search.svg?react'

import { observer } from 'mobx-react-lite'
import { ChangeEvent, useContext } from 'react'
import { EmployeesStateContext } from '../../pages/employees/state/EmployeesStateContext'

export const SearchBar = observer(() => {
  const employeesState = useContext(EmployeesStateContext)

  return (
    <div className="search-bar">
      <SearchIcon />
      <input
        placeholder="Search for employee"
        className="search-bar__input"
        type="text"
        data-listener-added_4a42d730="true"
        onChange={searchHandler}
      />
    </div>
  )

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    employeesState.updateSearchTerm({
      newSearchTerm: event.target.value,
    })
  }
})
