import { createAuthService } from '@tourmalinecore/react-tc-auth';
import { API_ROOT } from './config/config';

export const authService = createAuthService({
  authApiRoot: `${API_ROOT}/auth`,
  authType: 'ls',
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
});

export async function setLogin(payload) {
  const { data } = await authService.loginCall(payload);

  authService.setLoggedIn(data);
}
