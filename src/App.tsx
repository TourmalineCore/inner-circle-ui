import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from './features/auth/LoginPage';
import LogoutPage from './features/logout/LogoutPage';
import { withPrivateRoute } from './routes/authStateProvider/withPrivateRoute';
import Template from './template/Template';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/*"
          element={<WithPrivateRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
}
