import { useState } from 'react';

import { useParams } from 'react-router-dom';
import ContentCard from '../../components/ContentCard/ContentCard';
import ActionsBlock from '../../components/ActionsBlock/ActionsBlock';

import ProfileHeader from './components/ProfileHeader/ProfileHeader';
import ProfileNav from './components/ProfileNav/ProfileNav';
import getProfileAvailableActionButtons from './profileActionsFactory';

import './styles/ProfilePage.scss';

import { profileModes } from './profileModes';
import { profileSections, profileTabs } from './profileTabs';
import { infoData } from './mockData/infoData';

function ProfilePage() {
  const [profileMode, setProfileMode] = useState(profileModes.VIEW);

  const params = useParams();

  const activeTabKey = params.tabId || profileSections.SUMMARY;

  const mockData = infoData;

  return (
    <ContentCard
      isStickyHead
      headerContent={(
        <ProfileHeader>
          <ProfileNav
            tabs={
              Object.entries(profileTabs)
                .map(([profileTabKey, profileTab]) => ({
                  key: profileTabKey,
                  href: profileTab.link,
                  text: profileTab.tabLabel,
                  icon: profileTab.tabIcon,
                  active: profileTab.id === activeTabKey,
                  onClick: () => {},
                }))
            }
          />

          {profileTabs[activeTabKey].showActions && (
            <ActionsBlock
              availableActions={getProfileAvailableActionButtons({
                profileTab: profileTabs[activeTabKey],
                profileMode,
                setEditMode: () => setProfileMode(profileModes.EDIT),
                exitWithoutSave: () => setProfileMode(profileModes.VIEW),
                saveDataAndExit: () => setProfileMode(profileModes.VIEW),
                saveDisabled: false,
              })}
            />
          )}
        </ProfileHeader>
      )}
    >
      <div style={{ height: 2000, backgroundColor: '#f8fcff' }}>
        <ul className="profile-data">
          <li>
            <b>Имя:</b>
            {' '}
            {mockData.name}
          </li>
          <li>
            <b>Фамилия:</b>
            {' '}
            {mockData.surname}
          </li>
          <li>
            <b>Электронная почта:</b>
            {' '}
            {mockData.email}
          </li>
          <li>
            <b>Ставка в час:</b>
            {' '}
            {mockData.ratePerHour}
            {' '}
            рублей
          </li>
          <li>
            <b>Полный оклад:</b>
            {' '}
            {mockData.fullSalary}
            {' '}
            рублей
          </li>
          <li>
            <b>Ставка:</b>
            {' '}
            {mockData.employmentType}
          </li>
          <li>
            <b>Оклад:</b>
            {' '}
            {mockData.salary}
            {' '}
            рублей
          </li>
          <li>
            <b>Фактическая стоимость часа:</b>
            {' '}
            {mockData.hourCostFact}
            {' '}
            рублей
          </li>
          <li>
            <b>Стоимость часа на руки:</b>
            {' '}
            {mockData.hourCostForHands}
            {' '}
            рублей
          </li>
          <li>
            <b>Аванс:</b>
            {' '}
            {mockData.advancePayment}
            {' '}
            рублей
          </li>
          <li>
            <b>Доход:</b>
            {' '}
            {mockData.income}
            {' '}
            рублей
          </li>
          <li>
            <b>Расход:</b>
            {' '}
            {mockData.expenses}
            {' '}
            рублей
          </li>
          <li>
            <b>Прибыль:</b>
            {' '}
            {mockData.profit}
            {' '}
            рублей
          </li>
          <li>
            <b>Рентабельность:</b>
            {' '}
            {mockData.profitability}
            %
          </li>
          <li>
            <b>Зарплата до вычета НДФЛ:</b>
            {' '}
            {mockData.salaryBeforeTax}
            {' '}
            рублей
          </li>
          <li>
            <b>Зарплата с вычетом НДФЛ:</b>
            {' '}
            {mockData.salaryAfterTax}
            {' '}
            рублей
          </li>
        </ul>
      </div>
    </ContentCard>
  );
}

export default ProfilePage;
