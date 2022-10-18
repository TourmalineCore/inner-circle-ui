import {
  useContext, useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from '@tourmalinecore/react-tc-ui-kit';
import LoginForm from './components/LoginForm/LoginForm';

import { authService, setLogin } from '../../common/authService';

function LoginPage() {
  // @ts-ignore
  const [isAuthenticated] = useContext(authService.AuthContext);

  const history = useNavigate();

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [triedToSubmit, setTriedToSubmit] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history('/');
    }
  }, [isAuthenticated]);

  return (
    <div className="auth-page">
      <LoginForm
        onSubmit={handleFormSubmit}
      >
        <Input
          id="login"
          className="auth-page__input"
          type="text"
          label="Login"
          value={formData.login}
          isInvalid={!formData.login && triedToSubmit}
          validationMessages={['Поле должно быть заполнено']}
          isMessagesAbsolute
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, login: event.target.value })}
        />

        <Input
          id="password"
          className="auth-page__input"
          type="password"
          label="Password"
          value={formData.password}
          isInvalid={!formData.password && triedToSubmit}
          validationMessages={['Поле должно быть заполнено']}
          isMessagesAbsolute
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: event.target.value })}
        />
      </LoginForm>
    </div>
  );

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    const {
      login,
      password,
    } = formData;

    event.preventDefault();

    setTriedToSubmit(true);

    if (login && password) {
      try {
        await setLogin({ login, password });
      } catch (e) {
        setFormData({ ...formData, password: '' });
      }
    }
  }
}

export default LoginPage;
