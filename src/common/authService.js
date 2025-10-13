import { createAuthService } from '@tourmalinecore/react-tc-auth'
import { API_ROOT_AUTH } from './config/config'

export const authService = createAuthService({
  authApiRoot: API_ROOT_AUTH,
  authType: `ls`,
  tokenAccessor: `accessToken`,
  refreshTokenAccessor: `refreshToken`,
  tokenValueAccessor: `value`,
  tokenExpireAccessor: `expiresInUtc`,
})