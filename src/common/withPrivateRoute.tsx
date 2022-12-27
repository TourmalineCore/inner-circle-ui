import {
  FunctionComponent, useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './authService';
import { ENV_KEY } from './config/config';

const isProduction = ENV_KEY !== 'local';

export const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => function RequireAuthentication(props: Type) {
  // @ts-ignore
  const [token] = useContext(authService.AuthContext);

  const navigation = useNavigate();

  useEffect(() => {
    if (!token) {
      if (isProduction) {
        window.location.href = '/auth';
      } else {
        navigation('/auth');
      }
    }
  }, [token]);

  return token ? <ComposedComponent {...props} /> : null;
};
