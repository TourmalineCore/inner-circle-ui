import { createAuthService } from '@tourmalinecore/react-tc-auth';

export const authService = createAuthService({
  authApiRoot: 'http://localhost:5000',
  authType: 'ls',
  tokenAccessor: 'accessToken',
  refreshTokenAccessor: 'refreshToken',
  tokenValueAccessor: 'value',
  tokenExpireAccessor: 'expiresInUtc',
});

export async function login(payLog) {
  const { data } = await authService.loginCall(payLog);
  authService.setLoggedIn(data);
}
