import {
  useContext, useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from '@tourmalinecore/react-tc-ui-kit';
import LoginForm from './components/LoginForm/LoginForm';

import { login, authService } from '../../common/authService';

function LoginPage() {
  // @ts-ignore
  const [isAuthenticated] = useContext(authService.AuthContext);

  const history = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
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
          value={formData.email}
          isInvalid={!formData.email && triedToSubmit}
          validationMessages={['Login should be filled']}
          isMessagesAbsolute
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: event.target.value })}
        />

        <Input
          id="password"
          className="auth-page__input"
          type="password"
          label="Password"
          value={formData.password}
          isInvalid={!formData.password && triedToSubmit}
          validationMessages={['Password should be filled']}
          isMessagesAbsolute
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: event.target.value })}
        />
      </LoginForm>
    </div>
  );

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    const {
      email,
      password,
    } = formData;

    event.preventDefault();

    setTriedToSubmit(true);

    if (email && password) {
      try {
        await login({ username: email, password });
      } catch (e) {
        console.log(e);
        setFormData({ email: '', password: '' });
      }
    }
  }
}

export default LoginPage;
