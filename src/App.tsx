import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useMemo } from 'react';
import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import AccessBasedOnPemissionsState from './routes/state/AccessBasedOnPemissionsState';
import AccessBasedOnPemissionsStateContext from './routes/state/AccessBasedOnPemissionsStateContext';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  const routesState = useMemo(
    () => new AccessBasedOnPemissionsState(),
    [],
  );
  return (
    <AccessBasedOnPemissionsStateContext.Provider value={routesState}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<WithPrivateRoute />}
          />
        </Routes>
      </BrowserRouter>
    </AccessBasedOnPemissionsStateContext.Provider>
  );
}
