import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../common/authService';

function LogoutPage() {
  const history = useNavigate();

  useEffect(() => {
    authService.setLoggedOut();
    history('/auth');
  }, []);

  return (
    <div>You are now logged out</div>
  );
}

export default LogoutPage;
