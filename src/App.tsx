import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { authService } from './common/authService';
import AuthorizationPage from './features/authorization/AuthorizationPage';
import Template from './template/Template';

const WithPrivateRoute = authService.withPrivateRoute(Template);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<AuthorizationPage />}
        />
        <Route
          path="/*"
          element={<WithPrivateRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
}
