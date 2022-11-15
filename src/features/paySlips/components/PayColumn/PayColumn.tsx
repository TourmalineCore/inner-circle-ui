import './PayColumn.css';

function PayColumn({ name }:{ name: string }) {
  return (
    <div className="paycolumn">
      <label>{name}</label>
    </div>
  );
}

export default PayColumn;
