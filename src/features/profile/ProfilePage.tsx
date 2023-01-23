import React, { useEffect, useState } from 'react';

import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { faPhoneFlip, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import faGithub from '../../assets/icons/faGithub.svg';
import faGitlab from '../../assets/icons/faGitlab.svg';
import { LINK_TO_SALARY_SERVICE } from '../../common/config/config';
import { Employee } from './types/Profile';
import { api } from '../../common/api';
import InfoComponent from './components/InfoComponent/InfoComponent';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>(
    {
      id: 0,
      fullName: '',
      corporateEmail: '',
      personalEmail: '',
      phone: '',
      gitHub: '',
      gitLab: '',
    },
  );

  const history = useNavigate();

  useEffect(() => { loadEmployeesAsync(); }, []);

  return (
    <div className="profile">
      <div className="profile__inner">
        <h2>{employee.fullName}</h2>
        <InfoComponent
          value={employee.corporateEmail}
          icon={faEnvelope}
          link={`mailto:${employee.corporateEmail}`}
        />
        <InfoComponent
          value={employee.personalEmail}
          icon={faEnvelope}
          link={`mailto:${employee.personalEmail}`}
        />
        <InfoComponent
          value={employee.phone}
          icon={faPhoneFlip}
          link={`tel:${employee.phone}`}
        />
        <InfoComponent
          value={employee.gitHub}
          icon={faGithub}
          link={`https://github.com/${employee.gitHub}`}
        />
        <InfoComponent
          value={employee.gitLab}
          icon={faGitlab}
          link={`https://gitlab.com/${employee.gitLab}`}
        />
        <div className="profile__buttons">
          <Button
            type="button"
            className="profile__button"
            onClick={() => { history('/profile/edit'); }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );

  async function loadEmployeesAsync() {
    const { data } = await api.get<Employee>(`${LINK_TO_SALARY_SERVICE}employees/get-profile`);
    setEmployee(data);
  }
}

export default ProfilePage;
