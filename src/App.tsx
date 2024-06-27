import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useMemo } from 'react';
import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import AccessBasedOnPermissionsState from './routes/state/AccessBasedOnPermissionsState';
import AccessBasedOnPermissionsStateContext from './routes/state/AccessBasedOnPermissionsStateContext';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  const routesState = useMemo(
    () => new AccessBasedOnPermissionsState(),
    [],
  );
  return (
    <AccessBasedOnPermissionsStateContext.Provider value={routesState}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<WithPrivateRoute />}
          />
        </Routes>
      </BrowserRouter>
    </AccessBasedOnPermissionsStateContext.Provider>
  );
}
