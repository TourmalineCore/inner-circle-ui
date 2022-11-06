import ContentCard from '../../components/ContentCard/ContentCard';

import printData from './utils/printData';

import { infoData } from './mockData/infoData';

function ProfilePage() {
  const locale = 'ru-RU';

  return (
    <ContentCard
      style={{ height: 2000, backgroundColor: '#f8fcff', paddingTop: 5 }}
    >
      <ul className="profile-page__data">
        <li>
          <b>Имя:</b>
          {printData(infoData.name)}
        </li>
        <li>
          <b>Фамилия:</b>
          {printData(infoData.surname)}
        </li>
        <li>
          <b>Электронная почта:</b>
          {printData(infoData.email)}
        </li>
        <li>
          <b>Ставка в час:</b>
          {printData(infoData.ratePerHour, locale, true)}
        </li>
        <li>
          <b>Полный оклад:</b>
          {printData(infoData.fullSalary, locale, true)}
        </li>
        <li>
          <b>Ставка:</b>
          {printData(infoData.employmentType, locale, true)}
        </li>
        <li>
          <b>Оклад:</b>
          {printData(infoData.salary, locale, true)}
        </li>
        <li>
          <b>Фактическая стоимость часа:</b>
          {printData(infoData.hourCostFact, locale, true)}
        </li>
        <li>
          <b>Стоимость часа на руки:</b>
          {printData(infoData.hourCostForHands, locale, true)}
        </li>
        <li>
          <b>Аванс:</b>
          {printData(infoData.advancePayment, locale, true)}
        </li>
        <li>
          <b>Доход:</b>
          {printData(infoData.income, locale, true)}
        </li>
        <li>
          <b>Расход:</b>
          {printData(infoData.expenses, locale, true)}
        </li>
        <li>
          <b>Прибыль:</b>
          {printData(infoData.profit, locale, true)}
        </li>
        <li>
          <b>Рентабельность:</b>
          {printData(infoData.profitability)}
          %
        </li>
        <li>
          <b>Зарплата до вычета НДФЛ:</b>
          {printData(infoData.salaryBeforeTax, locale, true)}
        </li>
        <li>
          <b>Зарплата с вычетом НДФЛ:</b>
          {printData(infoData.salaryAfterTax, locale, true)}
        </li>
      </ul>
    </ContentCard>
  );
}

export default ProfilePage;
