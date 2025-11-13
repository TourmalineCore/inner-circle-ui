import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { EmployeeEditStateContext } from "./state/EmployeeEditStateContext"
import { EmployeeEditContent } from "./EmployeeEditContent"
import { api } from "../../common/api"
import { LINK_TO_SALARY_SERVICE } from "../../common/config/config"
import { useSearchParams } from "react-router-dom"
import { EditedEmployee } from "../../types/employee"
import { toast } from "react-toastify"

export const EmployeeEditContainer = observer(() => {
  const employeeEditState = useContext(EmployeeEditStateContext)

  const [
    param,
  ] = useSearchParams()
  const id = param.get(`id`)
    
  useEffect(() => {
    loadEmployeeAsync()
  }, [])

  return <EmployeeEditContent 
    updateEmployeesAsync={updateEmployeesAsync}
  />

  async function loadEmployeeAsync() {
    const {
      data, 
    } = await api.get<EditedEmployee>(`${LINK_TO_SALARY_SERVICE}employees/${id}`)
    
    employeeEditState.initialize({
      loadedEmployee: data,
    })
  }

  async function updateEmployeesAsync() {
    employeeEditState.setIsSaving()
    employeeEditState.setIsTriedToSubmit()

    if (!employeeEditState.isValid) {
      employeeEditState.resetIsSaving()
      return
    }
        
    const {
      employee,
    } = employeeEditState

    const [
      day,
      month,
      year,
    ] = employee.birthDate!.split(`/`)

    const formattedBirthDate = `${year}-${month}-${day}`

    const updateEmployee = {
      ...employee,
      birthDate: formattedBirthDate,
    }

    try {
      await api.put<EditedEmployee>(`${LINK_TO_SALARY_SERVICE}employees/update`, updateEmployee)
        
      window.location.href =`/employees`
    }
    catch (e:any) {
      toast.error(e.message)
    }
    finally {
      employeeEditState.resetIsTriedToSubmit()
      employeeEditState.resetIsSaving()
    }
  }
})