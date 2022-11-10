import ContentCard from '../../components/ContentCard/ContentCard';

import { formatMoney } from '../../common/utils/formatMoney';

import { infoData } from './mockData/infoData';

function ProfilePage() {
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
          {formatMoney(infoData.ratePerHour)}
        </li>
        <li>
          <b>Полный оклад: </b>
          {formatMoney(infoData.fullSalary)}
        </li>
        <li>
          <b>Ставка: </b>
          {infoData.employmentType}
        </li>
        <li>
          <b>Оклад: </b>
          {formatMoney(infoData.salary)}
        </li>
        <li>
          <b>Фактическая стоимость часа: </b>
          {formatMoney(infoData.hourCostFact)}
        </li>
        <li>
          <b>Стоимость часа на руки: </b>
          {formatMoney(infoData.hourCostForHands)}
        </li>
        <li>
          <b>Аванс: </b>
          {formatMoney(infoData.advancePayment)}
        </li>
        <li>
          <b>Доход: </b>
          {formatMoney(infoData.income)}
        </li>
        <li>
          <b>Расход: </b>
          {formatMoney(infoData.expenses)}
        </li>
        <li>
          <b>Прибыль: </b>
          {formatMoney(infoData.profit)}
        </li>
        <li>
          <b>Рентабельность: </b>
          {infoData.profitability}
          %
        </li>
        <li>
          <b>Зарплата до вычета НДФЛ: </b>
          {formatMoney(infoData.salaryBeforeTax)}
        </li>
        <li>
          <b>Зарплата с вычетом НДФЛ: </b>
          {formatMoney(infoData.salaryAfterTax)}
        </li>
      </ul>
    </ContentCard>
  );
}

export default ProfilePage;
