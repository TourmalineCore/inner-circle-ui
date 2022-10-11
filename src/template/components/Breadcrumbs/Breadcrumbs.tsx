import { Link } from 'react-router-dom';
import { BreadcrumbData } from 'use-react-router-breadcrumbs';

function Breadcrumbs({
  list = [],
}: {
  list: BreadcrumbData[];
}) {
  return !list.length
    ? <span>Homepage</span>
    : (
      <ul className="breadcrumbs">
        {list.map(({ breadcrumb, key }, i) => (
          <li key={key} className="breadcrumbs__item">
            {
              i !== list.length - 1
                ? <Link className="breadcrumbs__link" to={key}>{breadcrumb}</Link>
                : breadcrumb
            }
          </li>
        ))}
      </ul>
    );
}

export default Breadcrumbs;
