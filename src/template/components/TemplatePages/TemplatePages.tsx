import { Route, Routes } from 'react-router-dom';
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';

function TemplatePages({
  routes = [],
}: {
  routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[];
}) {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
    </Routes>
  );
}

export default TemplatePages;
