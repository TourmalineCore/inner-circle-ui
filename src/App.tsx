import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import { worker } from './mocks/browser';
import { ENV_KEY } from './common/config/config';

if (ENV_KEY === 'test') {
  worker.start();
}

const WithPrivateRoute = withPrivateRoute(Template);
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
