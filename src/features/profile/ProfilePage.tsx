import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ContentCard from '../../components/ContentCard/ContentCard';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import { Employee } from './types/Profile';
import InfoComponent from './components/InfoComponent/InfoComponent';
import ProfileButton from './components/ProfileButton/ProfileButton';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/employees/get-personal-information/1';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>();
  const [isRedact, serIsRedact] = useState(false);

  useEffect(() => {
    loadEmployeesAsync();
  }, []);

  return (
    <ContentCard
      isStickyHead
    >
      {
        employee
          ? (
            <div className="profile">
              <ProfileInfo
                rows={
                  [
                    isRedact
                      ? (
                        <>
                          <InfoComponent
                            value={`${employee.surname}`}
                            isRedact={isRedact}
                            label="Last Name"
                          />
                          <InfoComponent
                            value={`${employee.name}`}
                            isRedact={isRedact}
                            label="First Name"
                          />
                          <InfoComponent
                            value={`${employee.middleName}`}
                            isRedact={isRedact}
                            label="Middle Name"
                          />
                        </>
                      )
                      : (
                        <InfoComponent
                          value={`${employee.surname} ${employee.name} ${employee.middleName}`}
                        />
                      ),
                    <InfoComponent
                      value={`${employee.phone}`}
                      isRedact={isRedact}
                      label={isRedact ? 'Phone' : undefined}
                    />,
                    <InfoComponent
                      value={`${employee.workEmail}`}
                      isRedact={isRedact}
                      label={isRedact ? 'Work Email' : undefined}
                    />,
                    <InfoComponent
                      value={`${employee.personalEmail}`}
                      isRedact={isRedact}
                      label={isRedact ? 'Email' : undefined}
                    />,
                    <InfoComponent
                      value={`${employee.telegram}`}
                      isRedact={isRedact}
                      label={isRedact ? 'Telegram' : undefined}
                    />,
                    <InfoComponent
                      value={`${employee.skype}`}
                      isRedact={isRedact}
                      label={isRedact ? 'Skype' : undefined}
                    />,
                    <InfoComponent
                      value={`${employee.netSalary}`}
                      isRedact={isRedact}
                      label={isRedact ? 'Salary' : undefined}
                    />,
                  ]
                }
                buttons={
                  [
                    isRedact
                      ? (
                        <>
                          <ProfileButton
                            value="Cancel"
                            onClick={() => serIsRedact(!isRedact)}
                          />
                          <ProfileButton
                            value="Send a reqiest to edit"
                            onClick={() => serIsRedact(!isRedact)}
                          />
                        </>
                      ) : (
                        <ProfileButton
                          value="Request to edit"
                          onClick={() => serIsRedact(!isRedact)}
                        />
                      ),
                  ]
                }
              />
            </div>
          )
          : null
      }
    </ContentCard>
  );

  async function loadEmployeesAsync() {
    try {
      const { data } = await axios.get<Employee>(QUOTE_SERVICE_URL);
      setEmployee(data);
    } catch {
      const datae : Employee = {
        id: 1,
        name: 'Антон',
        surname: 'Антонов',
        middleName: 'Антонович',
        workEmail: 'anton@tourmaline.com',
        personalEmail: 'anton@mail.ru',
        phone: '+79128093630',
        skype: '@anton.skype',
        telegram: '@anton.telegram',
        netSalary: 50000,
      };
      setEmployee(datae);
    }
  }
}

export default ProfilePage;
