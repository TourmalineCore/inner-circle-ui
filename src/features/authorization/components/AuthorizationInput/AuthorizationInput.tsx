import './AuthorizationInput.css';

function AuthorizationInput({
  value, type, label, icon, placeholder,
}:{ value?: string, type?: string, label?: string, icon?: string, placeholder?: string }) {
  return (
    <div className="authorization-input">
      <div className="authorization-input__label">
        {label}
      </div>
      <div className="authorization-input__components">
        {icon
        && (
          <div className="authorization-input__components-icon">
            <img src={icon} alt={label} />
          </div>
        )}
        <input
          className="authorization-input__components-input"
          value={value}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default AuthorizationInput;
