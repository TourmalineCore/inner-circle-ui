import './AuthorizationButton.css';

function AuthorizationButton({ value }:{ value?: string }) {
  return (
    <div className="authorization-button">
      <button className="authorization-button__submit" type="submit">
        {value}
      </button>
    </div>
  );
}

export default AuthorizationButton;
