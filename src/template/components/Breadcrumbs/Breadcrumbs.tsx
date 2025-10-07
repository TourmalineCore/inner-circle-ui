import clsx from 'clsx'
import {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'
import IconBreadcrumbs from '../../../assets/icons/icon-arrow-breadcrumbs.svg?react'

export function Breadcrumbs({
  list = [],
}: {
  list: BreadcrumbData[],
}) {
  const breadcrumbsRef = useRef<HTMLUListElement>(null)
  const breadcrumbsLocatedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.innerWidth < 768) {
      breadcrumbsRef.current?.scrollTo({
        left: breadcrumbsLocatedRef.current?.getBoundingClientRect().right,
      })
    }
  }, [])

  return !list.length
    ? <span>Домашняя страница</span>
    : (
      <ul ref={breadcrumbsRef}
        className="breadcrumbs">
        {list.map(({
          breadcrumb, key, 
        }, i) => (
          <li key={key}
            className="breadcrumbs__item">
            {
              i !== list.length - 1
                ? (
                  <>
                    <Link className="breadcrumbs__link"
                      to={key}>{breadcrumb}</Link>
                    {list.length > 1 && (
                      <span className="breadcrumbs__icon">
                        <IconBreadcrumbs />
                      </span>
                    )}
                  </>
                )
                : (
                  <span
                    ref={breadcrumbsLocatedRef}
                    className={clsx(`breadcrumbs__breadcrumb`, {
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
    )
}
