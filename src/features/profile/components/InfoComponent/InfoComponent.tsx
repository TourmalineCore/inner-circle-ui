import './InfoComponent.css';

function InfoComponent({ value, isRedact } : { value : string, isRedact: boolean }) {
  return (
    isRedact
      ? (
        <div className="info-component">
          <input className="info-component-input" value={value} />
        </div>
      )
      : (
        <div className="profile-info-component">
          <label>{value}</label>
        </div>
      )
  );
}

export default InfoComponent;
