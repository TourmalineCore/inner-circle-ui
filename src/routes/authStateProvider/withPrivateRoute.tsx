import {
  FunctionComponent, useContext, useEffect,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from './authContext';

export const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => {
  return function RequireAuthentication(props: Type) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigation = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!isAuthenticated) {
        navigation(getAuthPathWithFromProperty(location.pathname));
      }
    }, [isAuthenticated]);

    return isAuthenticated ? <ComposedComponent {...props} /> : null;
  };

  function getAuthPathWithFromProperty(from: string) {
    return `/auth/login${from !== '/' && from ? `?from=${from}` : ''}`;
  }
};
