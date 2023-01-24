import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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
