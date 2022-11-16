import { useEffect, useState } from 'react';
import axios from 'axios';

import ContentCard from '../../components/ContentCard/ContentCard';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
// import { formatMoney } from '../../common/utils/formatMoney';
import { Employee } from './types/Profile';
import InfoComponent from './components/InfoComponent/InfoComponent';
import ProfileButton from './components/ProfileButton/ProfileButton';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/employees/get-personal-information/1';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>();
  const [isRedact, serIsRedact] = useState(false);

  useEffect(() => { loadEmployeesAsync(); }, []);
  const increment = () => {
    serIsRedact(!isRedact);
  };

  return (
    <ContentCard
      isStickyHead
    >
      {
        employee
          ? (
            <div className="profile">
              <ProfileInfo rows={
                [
                  isRedact
                    ? (
                      <>
                        <InfoComponent
                          value={`${employee.surname}`}
                          isRedact={isRedact}
                        />
                        <InfoComponent
                          value={`${employee.name}`}
                          isRedact={isRedact}
                        />
                        <InfoComponent
                          value={`${employee.middleName}`}
                          isRedact={isRedact}
                        />
                      </>
                    )
                    : (
                      <InfoComponent
                        value={`${employee.surname} ${employee.name} ${employee.middleName}`}
                        isRedact={isRedact}
                      />
                    ),
                  <InfoComponent
                    value={`${employee.phone}`}
                    isRedact={isRedact}
                  />,
                  <InfoComponent
                    value={`${employee.workEmail}`}
                    isRedact={isRedact}
                  />,
                  <InfoComponent
                    value={`${employee.personalEmail}`}
                    isRedact={isRedact}
                  />,
                  <InfoComponent
                    value={`${employee.telegram}`}
                    isRedact={isRedact}
                  />,
                  <InfoComponent
                    value={`${employee.skype}`}
                    isRedact={isRedact}
                  />,
                  <InfoComponent
                    value={`${employee.netSalary}`}
                    isRedact={isRedact}
                  />,
                ]
              }
              />
              <ProfileButton
                value="Request to edit"
                onClick={increment}
              />
            </div>
          )
          : null
      }

    </ContentCard>
  );

  async function loadEmployeesAsync() {
    const { data } = await axios.get<Employee>(QUOTE_SERVICE_URL);
    setEmployee(data);
  }
}

export default ProfilePage;
