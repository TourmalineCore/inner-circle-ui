import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { authService } from './common/authService';
import Template from './template/Template';

const WithPrivateRoute = authService.withPrivateRoute(Template);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<WithPrivateRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
}
