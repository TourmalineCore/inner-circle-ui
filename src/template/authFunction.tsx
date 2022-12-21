import {
  FunctionComponent, useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../common/authService';

export const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => {
  return function RequireAuthentication(props: Type) {
    // @ts-ignore
    const [token] = useContext(authService.AuthContext);

    const navigation = useNavigate();

    useEffect(() => {
      if (!token) {
        navigation(getAuthPathWithFromProperty(), {
          replace: true,
        });
      }
    }, [token]);

    return token ? <ComposedComponent {...props} /> : null;
  };

  function getAuthPathWithFromProperty() {
    return '/auth/logout';
  }
};
