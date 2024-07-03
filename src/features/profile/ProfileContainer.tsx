import { useContext, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';
import { Employee } from './types/Profile';
import { api } from '../../common/api';

import { ProfileStateContext } from './state/ProfileStateContext';
import { ProfileContent } from './ProfileContent';

export const ProfileContainer = observer(() => {
  useEffect(() => {
    loadEmployeeAsync();
  }, []);

  const profileState = useContext(ProfileStateContext);

  return (
    <ProfileContent editEmployeeAsync={editEmployeeAsync} />
  );

  async function loadEmployeeAsync() {
    profileState.setIsLoading(true);

    try {
      const {
        data,
      } = await api.get<Employee>(`${LINK_TO_SALARY_SERVICE}employees/get-profile`);

      const initialData = {
        ...data,
        phone: typeof data.phone === 'string'
          ? data.phone
            .split('')
            .slice(2)
            .join('')
          : data.phone,
      };

      profileState.setEmployee(initialData);

      profileState.initialize({
        employee: initialData,
      });
    } finally {
      profileState.setIsLoading(false);
    }
  }

  async function editEmployeeAsync() {
    profileState.setTriedToSubmit(true);
    const employee = profileState.employeeInfo;

    const updateEmployee = {
      personalEmail: employee.personalEmail,
      gitHub: employee.gitHub,
      gitLab: employee.gitLab,
      phone: `+7${employee.phone}`,
    };

    if (employee.phone.length > 9) {
      try {
        await api.put<Employee>(`${LINK_TO_SALARY_SERVICE}employees/update-profile`, updateEmployee);

        loadEmployeeAsync();
        profileState.setIsEdit(false);
      } finally {
        profileState.setTriedToSubmit(false);
      }
    }
  }
});
