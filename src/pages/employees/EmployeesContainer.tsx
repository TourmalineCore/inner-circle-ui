import { observer } from "mobx-react-lite"
import { EmployeesContent } from "./EmployeesContent"
import { LINK_TO_SALARY_SERVICE } from "../../common/config/config"
import { api } from "../../common/api"
import { useContext, useEffect } from "react"
import { EmployeesStateContext } from "./state/EmployeesStateContext"
import { toast } from "react-toastify"

export const EmployeesContainer = observer(() => {
  const employeesState = useContext(EmployeesStateContext)
    
  useEffect(() => {
    loadEmployeesAsync()
  }, [])

  return <EmployeesContent />

  async function loadEmployeesAsync() {
    employeesState.setIsLoading()

    try {
      const {
        data, 
      } = await api.get(`${LINK_TO_SALARY_SERVICE}employees/all `)

      employeesState.initialize({
        employees: data,
      })
    }
    catch (e: any) {
      toast.error(e.message)
    }
    finally {
      employeesState.resetIsLoading()
    }
  }
})