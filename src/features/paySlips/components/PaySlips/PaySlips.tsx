import PayColumn from '../PayColumn/PayColumn';
import './PaySlips.css';

function PaySlips(
  {
    columns,
  }:
  {
    columns: [string, string][]
  },
) {
  return (
    <div className="payslips">
      {columns.map((el) => (
        <PayColumn name={el[1]} />
      ))}
    </div>
  );
}

export default PaySlips;
