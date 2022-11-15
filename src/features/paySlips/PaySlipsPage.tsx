import PaySlips from './components/PaySlips/PaySlips';
import SearchBar from './components/SearchBar/SearchBar';
import './PaySlipsPage.css';

const data = [{ name: 'people 1', date: '11-03-2022' }, { name: 'people 2', date: '11-03-2022' }];

function PaySlipsPage() {
  return (
    <div className="payslipspage">
      <SearchBar />
      {data.map((el) => (
        <PaySlips columns={Object.entries(el)} />
      ))}
    </div>
  );
}

export default PaySlipsPage;
