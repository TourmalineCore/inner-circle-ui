import {
  FunctionComponent, useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './authService';
import { ENV_KEY } from './config/config';
import RoutesStateContext from '../routes/state/RoutesStateContext';
import { parseJwt } from '../features/employees/utils/utilsForPermissions';

const isProduction = ENV_KEY !== 'local';

export const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => function RequireAuthentication(props: Type) {
  // @ts-ignore
  const [token] = useContext(authService.AuthContext);
  const routesStateContext = useContext(RoutesStateContext);

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

  if (token) {
    routesStateContext.checkPermissionFromToken(parseJwt(token).permissions);
  }
  return token ? <ComposedComponent {...props} /> : null;
};
