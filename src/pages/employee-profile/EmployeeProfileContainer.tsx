import { observer } from "mobx-react-lite"
import { LINK_TO_SALARY_SERVICE } from "../../common/config/config"
import { api } from "../../common/api"
import { useContext, useEffect } from "react"
import { EmployeeProfileStateContext } from "./state/EmployeeProfileStateContext"

import { EmployeeProfileContent } from "./EmployeeProfileContent"
import { EmployeeProfile } from "../../types/employee"

export const EmployeeProfileContainer = observer(() => {
  const employeeProfileState = useContext(EmployeeProfileStateContext)
    
  useEffect(() => {
    loadEmployeeProfileAsync()
  }, [])

  return <EmployeeProfileContent
    editEmployeeAsync={editEmployeeAsync}
  />

  async function loadEmployeeProfileAsync() {
    const {
      data, 
    } = await api.get<EmployeeProfile>(`${LINK_TO_SALARY_SERVICE}employees/get-profile`)
      
    employeeProfileState.initialize({
      loadedEmployeeProfile: data,
    })

  }

  async function editEmployeeAsync() {
    employeeProfileState.setIsSaving()
    employeeProfileState.setIsTriedToSubmit()

    if (!employeeProfileState.isValid) {
      employeeProfileState.resetIsSaving()
      return
    }

    const {
      employeeProfile,
    } = employeeProfileState

    const updateEmployee = {
      phone: employeeProfile.phone,
      specializations: employeeProfile.specializations,
      personalEmail: employeeProfile.personalEmail,
      gitHub: employeeProfile.gitHub,
      gitLab: employeeProfile.gitLab,
      workerTime: employeeProfile.workerTime,
    }

    try {
      await api.put<EmployeeProfile>(`${LINK_TO_SALARY_SERVICE}employees/update-profile`, updateEmployee)
      
      loadEmployeeProfileAsync()
    }
    finally {
      employeeProfileState.resetIsTriedToSubmit()
      employeeProfileState.resetIsSaving()
    }
  }
})