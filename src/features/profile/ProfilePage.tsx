import './styles/index.scss';

import { infoData } from './mockData/infoData';

function ProfilePage() {
  const mockData = infoData;

  return (
    <div style={{ height: 2000, backgroundColor: '#f8fcff', paddingLeft: 20 }}>
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
          {Intl.NumberFormat('ru-RU').format(mockData.ratePerHour)}
          {' '}
          ₽
        </li>
        <li>
          <b>Полный оклад:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.fullSalary)}
          {' '}
          ₽
        </li>
        <li>
          <b>Ставка:</b>
          {' '}
          {mockData.employmentType}
        </li>
        <li>
          <b>Оклад:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.salary)}
          {' '}
          ₽
        </li>
        <li>
          <b>Фактическая стоимость часа:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.hourCostFact)}
          {' '}
          ₽
        </li>
        <li>
          <b>Стоимость часа на руки:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.hourCostForHands)}
          {' '}
          ₽
        </li>
        <li>
          <b>Аванс:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.advancePayment)}
          {' '}
          ₽
        </li>
        <li>
          <b>Доход:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.income)}
          {' '}
          ₽
        </li>
        <li>
          <b>Расход:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.expenses)}
          {' '}
          ₽
        </li>
        <li>
          <b>Прибыль:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.profit)}
          {' '}
          ₽
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
          {Intl.NumberFormat('ru-RU').format(mockData.salaryBeforeTax)}
          {' '}
          ₽
        </li>
        <li>
          <b>Зарплата с вычетом НДФЛ:</b>
          {' '}
          {Intl.NumberFormat('ru-RU').format(mockData.salaryAfterTax)}
          {' '}
          ₽
        </li>
      </ul>
    </div>
  );
}

export default ProfilePage;
