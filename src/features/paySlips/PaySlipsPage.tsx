import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PayComponent from './components/PayComponent/PayComponent';
import PaySlip from './components/PaySlip/PaySlip';
import PaySlips from './components/PaySlips/PaySlips';
import SearchBar from './components/SearchBar/SearchBar';
import './PaySlipsPage.css';

const data = [
  {
    id: 1, name: 'Антон Антонов Антонович', date: '12/12/2022', dateTime: new Date(2022, 12, 12),
  },
  {
    id: 2, name: 'Антон Антонов Антонович', date: '11/8/2022', dateTime: new Date(2022, 8, 12),
  },
  {
    id: 3, name: 'Антон Антонов Антонович', date: '11/10/2022', dateTime: new Date(2022, 10, 12),
  },
  {
    id: 4, name: 'Антон Антонов Антонович', date: '11/11/2022', dateTime: new Date(2022, 11, 12),
  },
  {
    id: 5, name: 'Антон Антонов Антонович', date: '11/7/2022', dateTime: new Date(2022, 7, 12),
  },
];

function PaySlipsPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [paySlips] = useState(data);
  const { id } = useParams();
  function isEqualDate(date: Date) {
    if (startDate === null) { return true; }

    if (date.getDate() === startDate.getDate()
    && date.getMonth() === startDate.getMonth() + 1
    && date.getFullYear() === startDate.getFullYear()) {
      return true;
    }
    return false;
  }
  return (
    id ? <PaySlip />
      : (
        <div className="payslipspage">
          <SearchBar startDate={startDate} setStartDate={setStartDate} />
          <PaySlips
            columns={[
              paySlips.sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1)).map((el) => (
                isEqualDate(el.dateTime)
                  ? (
                    <PayComponent
                      key={el.id}
                      id={el.id}
                      name={el.name}
                      date={el.date}
                    />
                  ) : undefined
              )),
            ]}
          />
        </div>
      )
  );
}

export default PaySlipsPage;
