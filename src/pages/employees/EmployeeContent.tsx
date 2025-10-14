import './EmployeesContent.scss'

import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { hasAccessPermission } from "../../common/utils/tokenUtils"
import { EmployeeList } from "./components/EmployeeList/EmployeeList"
import { FilterMenu } from "./components/FilterMenu/FilterMenu"
import { SearchBar } from "./components/SearchBar/SearchBar"
import { SortMenu } from "./components/SortMenu/SortMenu"
import { EmployeesStateContext } from "./state/EmployeesStateContext"

export const EmployeeContent = observer(() => {
  const employeesState = useContext(EmployeesStateContext)

  if (hasAccessPermission({
    permission: `ViewContacts`,
  }) && !hasAccessPermission({
    permission: `ViewSalaryAndDocumentsData`,
  })) {
    employeesState.updateFilterTerm(`all`)
  }
  
  return (
    <section className="employees">
      {
        employeesState.isBlankEmployees
          && hasAccessPermission({
            permission: `ViewSalaryAndDocumentsData`,
          })
          && <div className="employees__notification">
            You have blank employees. Please fill in their profiles.
          </div>
      }

      <div className="employees__box">
        <div><SearchBar /></div>
        {
          hasAccessPermission({
            permission: `ViewSalaryAndDocumentsData`,
          }) && <FilterMenu />
        }
        <SortMenu />
      </div>

      <div>
        <EmployeeList
          isLoading={employeesState.isLoading}
          employees={employeesState.allEmployees}
        />
      </div>
    </section>
  )
})