import './PaySlips.css';

function PaySlips({ columns } : { columns: any[] }) {
  return (
    <div className="pay-slips">
      {columns}
    </div>
  );
}

export default PaySlips;
