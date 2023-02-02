import clsx from 'clsx';
import {
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { ReactComponent as IconBreadcrumbs } from '../../../assets/icons/arrow-breadcrumbs.svg';

function Breadcrumbs({
  list = [],
}: {
  list: BreadcrumbData[];
}) {
  useEffect(() => {
    if (window.innerWidth < 768) {
      const main = document.querySelector('.breadcrumbs');
      const sdfs = document.querySelector('.breadcrumbs__breadcrumb--located');

      main?.scrollTo({
        left: sdfs?.getBoundingClientRect().left,
      });
    }
  }, []);

  return !list.length
    ? <span>Домашняя страница</span>
    : (
      <ul className="breadcrumbs">
        {list.map(({ breadcrumb, key }, i) => (
          <li key={key} className="breadcrumbs__item">
            {
              i !== list.length - 1
                ? (
                  <span>
                    <Link className="breadcrumbs__link" to={key}>{breadcrumb}</Link>
                    {list.length > 1 && (
                      <span className="breadcrumbs__icon">
                        <IconBreadcrumbs />
                      </span>
                    )}
                  </span>
                )
                : (
                  <span className={clsx('breadcrumbs__breadcrumb', {
                    'breadcrumbs__breadcrumb--located': list.length > 1,
                  })}
                  >
                    {breadcrumb}
                  </span>
                )
            }
          </li>
        ))}
      </ul>
    );
}

export default Breadcrumbs;
