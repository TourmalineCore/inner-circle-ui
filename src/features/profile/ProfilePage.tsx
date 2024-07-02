/* eslint-disable no-unneeded-ternary */
import { useEffect, useState } from 'react';

import Skeleton from 'react-loading-skeleton';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';
import { Employee } from './types/Profile';
import { api } from '../../common/api';

import { GeneralInfo } from './sections/general-info/GeneralInfo';
import { ContactsInfo } from './sections/contacts-info/ContactsInfo';
import { SalaryInfo } from './sections/salary-info/SalaryInfo';

const initialValues = {
  id: 0,
  fullName: '',
  corporateEmail: '',
  personalEmail: '',
  phone: '',
  gitHub: '',
  gitLab: '',
  fullSalary: 0,
  districtCoefficient: 0,
  incomeTax: 0,
  netSalary: 0,
  isSalaryInfoFilled: false,
  isEmployedOfficially: false,
};

export function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>(initialValues);
  const [initEmployee, initSetEmployee] = useState<Employee>(initialValues);

  const [triedToSubmit, setTriedToSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadEmployeeAsync();
  }, []);

  return (
    <div className="profile" data-cy="profile">
      <div className="profile__inner">
        <GeneralInfo
          employee={employee}
          isLoading={isLoading}
        />

        <div className="profile__box">
          <div className="profile__edit-box">
            <h2 className="profile__head">Contacts</h2>
            {
              !isLoading && (
                <div className="profile__buttons">
                  {
                    !isEdit ? (
                      <button
                        type="button"
                        className="profile__button"
                        onClick={() => setIsEdit(true)}
                      >
                        Edit
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="profile__button"
                          onClick={() => {
                            editEmployeeAsync();
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="profile__button"
                          onClick={() => {
                            setIsEdit(false);
                            setEmployee(initEmployee);
                            setTriedToSubmit(false);
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    )
                  }
                </div>
              )
            }
          </div>
          {
            isLoading ? (
              <Skeleton
                className="profile__skeleton"
                count={4}
                containerTestId="loading-contacts"
              />
            ) : (
              <ContactsInfo
                employee={employee}
                isEdit={isEdit}
                setEmployee={setEmployee}
                triedToSubmit={triedToSubmit}
              />
            )
          }
        </div>

        <SalaryInfo
          employee={employee}
          isLoading={isLoading}
        />
      </div>
    </div>
  );

  async function loadEmployeeAsync() {
    setIsLoading(true);

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

      setEmployee(initialData);
      initSetEmployee(initialData);
    } finally {
      setIsLoading(false);
    }
  }

  async function editEmployeeAsync() {
    setTriedToSubmit(true);

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
        setIsEdit(false);
      } finally {
        setTriedToSubmit(false);
      }
    }
  }
}
