import { observer } from "mobx-react-lite"
import { EmployeeContent } from "./EmployeeContent"
import { LINK_TO_SALARY_SERVICE } from "../../common/config/config"
import { api } from "../../common/api"
import { useContext, useEffect } from "react"
import { EmployeesStateContext } from "./state/EmployeesStateContext"
import { toast } from "react-toastify"

export const EmployeeContainer = observer(() => {
  const employeesState = useContext(EmployeesStateContext)
    
  useEffect(() => {
    loadEmployeesAsync()
  }, [])

  return <EmployeeContent />

  async function loadEmployeesAsync() {
    employeesState.setIsLoading()

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
      employeesState.resetIsLoading()
    }
  }
})