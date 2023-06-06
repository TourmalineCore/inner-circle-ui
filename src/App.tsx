import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useMemo } from 'react';
import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import RoutesState from './routes/state/RoutesState';
import RoutesStateContext from './routes/state/RoutesStateContext';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  const routesState = useMemo(
    () => new RoutesState(),
    [],
  );
  return (
    <RoutesStateContext.Provider value={routesState}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<WithPrivateRoute />}
          />
        </Routes>
      </BrowserRouter>
    </RoutesStateContext.Provider>
  );
}
