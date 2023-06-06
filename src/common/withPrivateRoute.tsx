import {
  FunctionComponent, useContext, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './authService';
import { ENV_KEY } from './config/config';
import AccessBasedOnPemissionsStateContext from '../routes/state/AccessBasedOnPemissionsStateContext';
import { parseJwt } from '../features/employees/utils/utilsForPermissions';

const isProduction = ENV_KEY !== 'local';

export const withPrivateRoute = <Type extends Record<string, unknown>>(ComposedComponent: FunctionComponent<Type>) => function RequireAuthentication(props: Type) {
  // @ts-ignore
  const [token] = useContext(authService.AuthContext);
  const accessBasedOnPemissionsState = useContext(AccessBasedOnPemissionsStateContext);

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
    accessBasedOnPemissionsState.checkPermissionFromToken(parseJwt(token).permissions);
  }
  return token ? <ComposedComponent {...props} /> : null;
};
