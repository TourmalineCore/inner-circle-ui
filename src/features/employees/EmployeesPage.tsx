import './EmployeesPage.scss'

import { useEffect, useMemo, useState} from 'react'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { SearchBar } from './components/SearchBar/SearchBar'
import { EmployeeList } from './components/EmployeeList/EmployeeList'
import { SortMenu } from './components/SortMenu/SortMenu'
import { EmployeesStateContext } from './context/EmployeesStateContext'
import { EmployeesState } from './context/EmployeesState'
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config'
import { api } from '../../common/api'
import { FilterMenu } from './components/FilterMenu/FilterMenu'
import { hasAccessPermission } from '../../common/utils/tokenUtils'
import { authService } from '../../common/authService'

export const EmployeesPage = observer(() => {
  const employeesState = useMemo(() => new EmployeesState(), [])

  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  if (hasAccessPermission({
    permission: `ViewContacts`,
  }) && !hasAccessPermission({
    permission: `ViewSalaryAndDocumentsData`,
  })) {
    employeesState.updateFilterTerm(`all`)
  }

  useEffect(() => {
    loadEmployeesAsync()
  }, [])

  return (
    <EmployeesStateContext.Provider value={employeesState}>
      <authService.AuthContext.Provider value={[
        authService.getAuthToken(),
      ]}>
        <section className="employees-page">
          {
            employeesState.isBlankEmployees
          && hasAccessPermission({
            permission: `ViewSalaryAndDocumentsData`,
          })
          && <div className="employees-page__notification">
            You have blank employees. Please fill in their profiles.
          </div>
          }

          <div className="employees-page__box">
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
              isLoading={isLoading}
              employees={employeesState.allEmployees}
            />
          </div>
        </section>
      </authService.AuthContext.Provider>
    </EmployeesStateContext.Provider>
  )

  async function loadEmployeesAsync() {
    setIsLoading(true)

    try {
      const {
        data, 
      } = await api.get(`${LINK_TO_SALARY_SERVICE}employees/all `)

      employeesState.changeEmployees(data)
    }
    catch (e: any) {
      toast.error(e.message)
    }
    finally {
      setIsLoading(false)
    }
  }
})
