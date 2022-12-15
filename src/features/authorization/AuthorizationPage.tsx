import AuthorizationInput from './components/AuthorizationInput/AuthorizationInput';

import iconUser from '../../assets/icons/iconUser.svg';
import iconPassword from '../../assets/icons/iconPassword.svg';
import logo from '../../assets/img/logo.svg';

import AuthorizationButton from './components/AuthorizationButton/AuthorizationButton';

import './AuthorizationPage.css';
import AuthorizationEllipsis from './components/AuthorizationEllipsis/AuthorizationEllipsis';

function AuthorizationPage() {
  return (
    <div className="authorization">
      <div className="authorization-window">
        <div className="authorization-window__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="authorization-window__text">
          <div className="authorization-window__text-welcome">Welcome back!</div>
          <div className="authorization-window__text-desc">Sign in to your account</div>
        </div>
        <div className="authorization-window__inputs">
          <AuthorizationInput
            type="text"
            label="Email"
            icon={iconUser}
            placeholder="email@mail.ru"
          />
          <AuthorizationInput
            type="password"
            label="Password"
            icon={iconPassword}
            placeholder="8+ characters"
          />
        </div>
        <div className="authorization-window__button">
          <div className="authorization-window__button-forgot">
            Forgot password?
          </div>
          <AuthorizationButton value="Login" />
        </div>
      </div>
      <AuthorizationEllipsis x="-10%" y="-69%" />
      <AuthorizationEllipsis x="35%" y="-96%" />
      <AuthorizationEllipsis x="78%" y="31%" />
    </div>
  );
}

export default AuthorizationPage;
