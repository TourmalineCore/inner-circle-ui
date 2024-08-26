import { authService } from '../authService';

const REFRESH_TIMEOUT = 1000 * 60;
let timeoutId: any = null;

export async function refreshTokenAndSubscribe() {
  authService.subscribeOnTokenChange(setRefreshTimeout);

  if (authService.getRefreshToken()) {
    try {
      await authService.refreshToken();
    } catch {
      authService.setLoggedOut();
    }
  }
}

function setRefreshTimeout(token: any) {
  clearTimeout(timeoutId);

  if (!token) {
    return;
  }

  timeoutId = setTimeout(() => {
    if (authService.getRefreshToken()) {
      if (authService.getRefreshToken()) {
        try {
          authService.refreshToken();
        } catch {
          authService.setLoggedOut();
        }
      }
    } else {
      clearTimeout(timeoutId);
    }
  }, REFRESH_TIMEOUT);
}
