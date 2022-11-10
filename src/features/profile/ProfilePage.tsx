import ContentCard from '../../components/ContentCard/ContentCard';

import { formatMoney } from '../../common/utils/formatMoney';

import { infoData } from './mockData/infoData';

function ProfilePage() {
  const locale = 'ru-RU';

  return (
    <ContentCard className="profile-page__card">
      <ul className="profile-page__data">
        <li>
          <b>Имя: </b>
          {infoData.name}
        </li>
        <li>
          <b>Фамилия: </b>
          {infoData.surname}
        </li>
        <li>
          <b>Электронная почта: </b>
          {infoData.email}
        </li>
        <li>
          <b>Ставка в час: </b>
          {formatMoney(infoData.ratePerHour, locale)}
        </li>
        <li>
          <b>Полный оклад: </b>
          {formatMoney(infoData.fullSalary, locale)}
        </li>
        <li>
          <b>Ставка: </b>
          {infoData.employmentType}
        </li>
        <li>
          <b>Оклад: </b>
          {formatMoney(infoData.salary, locale)}
        </li>
        <li>
          <b>Фактическая стоимость часа: </b>
          {formatMoney(infoData.hourCostFact, locale)}
        </li>
        <li>
          <b>Стоимость часа на руки: </b>
          {formatMoney(infoData.hourCostForHands, locale)}
        </li>
        <li>
          <b>Аванс: </b>
          {formatMoney(infoData.advancePayment, locale)}
        </li>
        <li>
          <b>Доход: </b>
          {formatMoney(infoData.income, locale)}
        </li>
        <li>
          <b>Расход: </b>
          {formatMoney(infoData.expenses, locale)}
        </li>
        <li>
          <b>Прибыль: </b>
          {formatMoney(infoData.profit, locale)}
        </li>
        <li>
          <b>Рентабельность: </b>
          {infoData.profitability}
          %
        </li>
        <li>
          <b>Зарплата до вычета НДФЛ: </b>
          {formatMoney(infoData.salaryBeforeTax, locale)}
        </li>
        <li>
          <b>Зарплата с вычетом НДФЛ: </b>
          {formatMoney(infoData.salaryAfterTax, locale)}
        </li>
      </ul>
    </ContentCard>
  );
}

export default ProfilePage;
