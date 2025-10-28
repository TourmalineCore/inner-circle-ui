import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { EmployeeEditStateContext } from "./state/EmployeeEditStateContext"
import { EmployeeEditContent } from "./EmployeeEditContent"
import { api } from "../../common/api"
import { LINK_TO_SALARY_SERVICE } from "../../common/config/config"
import { useSearchParams } from "react-router-dom"
import { EditedEmployee } from "../../types/employee"
import { toast } from "react-toastify"

export const EmployeesEditContainer = observer(() => {
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
    const {
      employee,
    } = employeeEditState
    
    const updateEmployee = {
      ...employee,
      employmentType: employee.employmentType === null
        ? 1
        : employee.employmentType,
      phone: `+7${employee.phone}`,
      ratePerHour: employee.ratePerHour || 0,
      parking: employee.parking || 0,
      personnelNumber: employee.isEmployedOfficially
        ? `${employee.personnelNumber?.substring(0, 2)}/${employee.personnelNumber?.substring(2, 4)}`
        : null,
    }

    delete updateEmployee.dismissalDate

    employeeEditState.setIsTriedToSubmit()

    const isValidPersonnelNumber = employee.isEmployedOfficially
      ? employee.personnelNumber!.length >= 4
      : true

    if (updateEmployee.phone.length > 9 && isValidPersonnelNumber) {
      try {
        await api.put<EditedEmployee>(`${LINK_TO_SALARY_SERVICE}employees/update`, updateEmployee)

        employeeEditState.resetIsTriedToSubmit()
        window.location.href =`/employees`
      }
      catch (e:any) {
        toast.error(e.message)
      }
    }
  }
})