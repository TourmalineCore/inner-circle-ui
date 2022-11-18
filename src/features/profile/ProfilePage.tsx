import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faPhoneFlip, faEnvelope, faCoins } from '@fortawesome/free-solid-svg-icons';
import ContentCard from '../../components/ContentCard/ContentCard';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import { Employee } from './types/Profile';
import InfoComponent from './components/InfoComponent/InfoComponent';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/finances/get-profile-information/1';
const POST_SERVICE_URL = '*';

function ProfilePage() {
  const [isRedact, serIsRedact] = useState(false);
  const [employee, setEmployee] = useState<Employee>();

  const [form, setForm] = useState({
    personalEmail: employee?.personalEmail,
    phone: employee?.phone,
    skype: employee?.skype,
    telegram: employee?.telegram,
  });

  useEffect(() => { loadEmployeesAsync(); }, []);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedForm = {
      ...form,
      [name]: value,
    };
    setForm(updatedForm);
  };

  function handleOnRedact() {
    setForm({
      personalEmail: employee?.personalEmail,
      phone: employee?.phone,
      skype: employee?.skype,
      telegram: employee?.telegram,
    });
  }

  function handleSave() {
    const updateEmp : Employee = {
      id: employee ? employee.id : undefined,
      name: employee ? employee.name : undefined,
      surname: employee ? employee.surname : undefined,
      middleName: employee ? employee.middleName : undefined,
      workEmail: employee ? employee.workEmail : undefined,
      personalEmail: form.personalEmail,
      phone: form.phone,
      skype: form.skype,
      telegram: form.telegram,
      netSalary: employee ? employee.netSalary : undefined,
    };
    setEmployee(updateEmp);
    updateEmployeesAsync();
  }

  return (
    <ContentCard>
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
                          text="name"
                        />
                      ),
                    <InfoComponent
                      name="phone"
                      value={`${isRedact ? form.phone : employee.phone}`}
                      label={isRedact ? 'Phone' : undefined}
                      isRedact={isRedact}
                      onChange={handleFormChange}
                      faIcon={faPhoneFlip}
                    />,
                    <InfoComponent
                      name="workEmail"
                      value={`${employee.workEmail}`}
                      label={isRedact ? 'Work Email' : undefined}
                      isRedact={isRedact}
                      faIcon={faEnvelope}
                    />,
                    <InfoComponent
                      name="personalEmail"
                      value={`${isRedact ? form.personalEmail : employee.personalEmail}`}
                      label={isRedact ? 'Email' : undefined}
                      isRedact={isRedact}
                      onChange={handleFormChange}
                      faIcon={faEnvelope}
                    />,
                    <InfoComponent
                      name="telegram"
                      value={`${isRedact ? form.telegram : employee.telegram}`}
                      label={isRedact ? 'Telegram' : undefined}
                      isRedact={isRedact}
                      onChange={handleFormChange}
                      icon="component-label-telegram"
                    />,
                    <InfoComponent
                      name="skype"
                      value={`${isRedact ? form.skype : employee.skype}`}
                      label={isRedact ? 'Skype' : undefined}
                      isRedact={isRedact}
                      onChange={handleFormChange}
                      icon="component-label-skype"
                    />,
                    <InfoComponent
                      name="netSalary"
                      value={`${employee.netSalary}`}
                      label={isRedact ? 'Salary' : undefined}
                      isRedact={isRedact}
                      faIcon={faCoins}
                    />,
                  ]
                }
                buttons={
                  [
                    isRedact
                      ? (
                        <>
                          <Button
                            type="button"
                            onClick={() => serIsRedact(!isRedact)}
                            className="profile-bt"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => { handleSave(); serIsRedact(!isRedact); }}
                            className="profile-bt"
                          >
                            Send a reqiest to edit
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => { serIsRedact(!isRedact); handleOnRedact(); }}
                          className="profile-bt"
                        >
                          Request to edit
                        </Button>
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
  async function updateEmployeesAsync() {
    await axios.post(POST_SERVICE_URL, employee);
  }
}

export default ProfilePage;
