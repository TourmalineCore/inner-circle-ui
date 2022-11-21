import PayComponent from './components/PayComponent/PayComponent';
import PaySlips from './components/PaySlips/PaySlips';
import './PaySlipsPage.css';

const data = [{ name: 'Антон Антонов Антонович', date: '11-03-2022' }, { name: 'Антон Антонов Антонович', date: '11-03-2022' }];

function PaySlipsPage() {
  return (
    <div className="payslipspage">
      <PaySlips
        columns={[
          data.map((el) => (
            <PayComponent
              name={el.name}
              date={el.date}
            />
          )),
        ]}
      />
    </div>
  );
}

export default PaySlipsPage;
