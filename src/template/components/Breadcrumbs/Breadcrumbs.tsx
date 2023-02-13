import clsx from 'clsx';
import {
  useEffect, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { ReactComponent as IconBreadcrumbs } from '../../../assets/icons/icon-arrow-breadcrumbs.svg';

function Breadcrumbs({
  list = [],
}: {
  list: BreadcrumbData[];
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const locatedElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      listRef.current?.scrollTo({
        left: locatedElementRef.current?.getBoundingClientRect().right,
      });
    }
  }, []);

  return !list.length
    ? <span>Домашняя страница</span>
    : (
      <ul ref={listRef} className="breadcrumbs">
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
                  <span
                    ref={locatedElementRef}
                    className={clsx('breadcrumbs__breadcrumb', {
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
