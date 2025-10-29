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
    employeeProfileState.setIsLoading()

    try {
      const {
        data, 
      } = await api.get<EmployeeProfile>(`${LINK_TO_SALARY_SERVICE}employees/get-profile`)

      const initialData = {
        ...data,
        phone: typeof data.phone === `string`
          ? data.phone
            .split(``)
            .slice(2)
            .join(``)
          : data.phone,
      }
      
      employeeProfileState.initialize({
        loadedEmployeeProfile: initialData,
      })
    }
    finally {
      employeeProfileState.resetIsLoading()
    }
  }

  async function editEmployeeAsync() {
    employeeProfileState.setIsTriedToSubmit()

    const updateEmployee = {
      personalEmail: employeeProfileState.employeeProfile.personalEmail,
      gitHub: employeeProfileState.employeeProfile.gitHub,
      gitLab: employeeProfileState.employeeProfile.gitLab,
      phone: `+7${employeeProfileState.employeeProfile.phone}`,
    }

    if (employeeProfileState.employeeProfile.phone.length > 9) {
      try {
        await api.put<EmployeeProfile>(`${LINK_TO_SALARY_SERVICE}employees/update-profile`, updateEmployee)

        loadEmployeeProfileAsync()

        employeeProfileState.resetIsEdit()
      }
      finally {
        employeeProfileState.resetIsTriedToSubmit()
      }
    }
  }
})