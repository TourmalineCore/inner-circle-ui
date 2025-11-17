import { observer } from "mobx-react-lite"
import { LINK_TO_EMPLOYEES_SERVICE } from "../../common/config/config"
import { api } from "../../common/api"
import { useContext, useEffect } from "react"
import { EmployeeProfileStateContext } from "./state/EmployeeProfileStateContext"

import { EmployeeProfileContent } from "./EmployeeProfileContent"
import { EmployeeProfile } from "../../types/employee"
import { toast } from "react-toastify"

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
    } = await api.get<EmployeeProfile>(`${LINK_TO_EMPLOYEES_SERVICE}employees/get-profile`)
      
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

    const {
      phone,
      specializations,
      personalEmail,
      gitHub,
      gitLab,
      workerTime,
    } = employeeProfile

    const updateEmployee = {
      phone: phone,
      specializations: specializations,
      personalEmail: personalEmail,
      gitHub: gitHub,
      gitLab: gitLab,
      workerTime: workerTime,
    }

    try {
      await api.put<EmployeeProfile>(`${LINK_TO_EMPLOYEES_SERVICE}employees/update-profile`, updateEmployee)
      
      toast.success(`Profile has been successfully updated.`, {
        toastId: `employee-profile`,
        position: `top-right`,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      })
    }
    finally {
      employeeProfileState.resetIsTriedToSubmit()
      employeeProfileState.resetIsSaving()
    }
  }
})