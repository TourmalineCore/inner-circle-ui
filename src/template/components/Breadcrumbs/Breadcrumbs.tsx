import { Link } from 'react-router-dom';
import { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { ReactComponent as IconBreadcrumbs } from '../../../assets/icons/arrow-breadcrumbs.svg';

function Breadcrumbs({
  list = [],
}: {
  list: BreadcrumbData[];
}) {
  return !list.length
    ? <span>Домашняя страница</span>
    : (
      <ul className="breadcrumbs">
        {list.map(({ breadcrumb, key }, i) => (
          <li key={key} className="breadcrumbs__item">
            {
              i !== list.length - 1
                ? (
                  <Link className="breadcrumbs__link" to={key}>{breadcrumb}</Link>
                )
                : (
                  <>
                    {list.length > 1 && (
                      <span className="breadcrumbs__icon">
                        <IconBreadcrumbs />
                      </span>
                    )}
                    <span className="breadcrumbs__breadcrumb">{breadcrumb}</span>
                  </>
                )
            }
          </li>
        ))}
      </ul>
    );
}

export default Breadcrumbs;
