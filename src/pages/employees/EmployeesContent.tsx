import './EmployeesContent.scss'

import Avatar from '../../assets/images/avatar.png'

import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { hasAccessPermission } from "../../common/utils/tokenUtils"
import { EmployeeList } from "./components/employee-list/EmployeeList"
import { FilterMenu } from "../../components/filter-menu/FilterMenu"
import { SearchBar } from "../../components/search-bar/SearchBar"
import { EmployeesStateContext } from "./state/EmployeesStateContext"
import { RadioSelect } from '../../components/radio-select/RadioSelect'
import { toast } from "react-toastify"

export const EmployeesContent = observer(() => {
  const employeesState = useContext(EmployeesStateContext)
  
  const employees = employeesState.allEmployees

  const isHasViewSalaryAndDocumentsDataPermission = hasAccessPermission({
    permission: `ViewSalaryAndDocumentsData`, 
  })

  useEffect(() => {
    if (employeesState.isBlankEmployees && isHasViewSalaryAndDocumentsDataPermission) {
      toast.warning(`You have blank employees. Please fill in their profiles.`, {
        toastId: `blank-employees`,
        position: `top-right`,
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      })
    }
  }, [
    employeesState.isBlankEmployees,
  ])

  return (
    <section
      className="employees"
      data-cy="employees"
    >
      {
        isHasViewSalaryAndDocumentsDataPermission && <FilterMenu />
      }
        
      <div className="employees__actions">
        <SearchBar 
          onChange={(value) => employeesState.updateSearchTerm({
            newSearchTerm: value,
          })}
        />

        <RadioSelect
          value={employeesState.sortTerm} 
          options={[
            {
              value: `asc`,
              label: `Sort by Surname (А to Я)`, 
            },
            {
              value: `desc`,
              label: `Sort by Surname (Я to А)`, 
            },
          ]}
          onChange={(optionValue) => {
            employeesState.updateSortTerm({
              newSortTerm: optionValue,
            })
          }}
        />
      </div>

      {
        employees.length === 0 
          ? (
            <div className='employees__empty'>
              <img
                src={Avatar}
                alt=""
              />
              {`There are no ${employeesState.filterTerm} employees`}
            </div>
          )
          : <EmployeeList employees={employeesState.allEmployees} />
      }
    </section>
  )
})