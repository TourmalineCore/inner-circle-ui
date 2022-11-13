import { useEffect, useState } from 'react';
import axios from 'axios';

import ContentCard from '../../components/ContentCard/ContentCard';
import { formatMoney } from '../../common/utils/formatMoney';
import { Employee } from './types/Profile';

const QUOTE_SERVICE_URL = 'http://localhost:5000/api/employees/get-full-employee-info/1';

function ProfilePage() {
  const [employee, setEmployee] = useState<Employee>();
  async function loadEmployeesAsync() {
    const { data } = await axios.get<Employee>(QUOTE_SERVICE_URL);
    setEmployee(data);
  }
  useEffect(() => { loadEmployeesAsync(); }, []);

  return (
    <ContentCard
      className="profile-page__card"
      isStickyHead
    >
      {employee && (
        <ul className="profile-page__data">
          <li>
            <b>Name: </b>
            {employee.name}
            {' '}
            {employee.surname}
          </li>
          <li>
            <b>Rate per Hour: </b>
            {formatMoney(employee.ratePerHour)}
          </li>
          <li>
            <b>Pay: </b>
            {formatMoney(employee.pay)}
          </li>
          <li>
            <b>Employment Type: </b>
            {employee.employmentType}
          </li>
          <li>
            <b>Salary: </b>
            {formatMoney(employee.pay * employee.employmentType)}
          </li>
          <li>
            <b>Hourly Cost (By Fact): </b>
            {formatMoney(employee.hourlyCostFact)}
          </li>
          <li>
            <b>Hourly Cost (On Hand): </b>
            {formatMoney(employee.hourlyCostHand)}
          </li>
          <li>
            <b>Retainer: </b>
            {formatMoney(employee.retainer)}
          </li>
          <li>
            <b>Earnings: </b>
            {formatMoney(employee.earnings)}
          </li>
          <li>
            <b>Expenses: </b>
            {formatMoney(employee.expenses)}
          </li>
          <li>
            <b>Profit: </b>
            {formatMoney(employee.profit)}
          </li>
          <li>
            <b>Profitability: </b>
            {employee.profitAbility}
            %
          </li>
          <li>
            <b>Gross Salary: </b>
            {formatMoney(employee.grossSalary)}
          </li>
          <li>
            <b>Net Salary: </b>
            {formatMoney(employee.netSalary)}
          </li>
        </ul>
      )}
      {!employee && <h1>TODO: Loader</h1>}
    </ContentCard>
  );
}

export default ProfilePage;
