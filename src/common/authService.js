import { createAuthService } from '@tourmalinecore/react-tc-auth'
import { AUTH_API_ROOT_URL } from './config/config'

export const authService = createAuthService({
  authApiRoot: AUTH_API_ROOT_URL,
  authType: `ls`,
  tokenAccessor: `accessToken`,
  refreshTokenAccessor: `refreshToken`,
  tokenValueAccessor: `value`,
  tokenExpireAccessor: `expiresInUtc`,
})