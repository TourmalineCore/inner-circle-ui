import './FilterMenu.scss'

import { MouseEvent, useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import { EmployeesStateContext } from '../../pages/employees/state/EmployeesStateContext'

const filterElements = [
  {
    id: `current`,
    name: `Current`,
  },
  {
    id: `fired`,
    name: `Fired`,
  },
  {
    id: `all`,
    name: `All`,
  },
  {
    id: `blank`,
    name: `Blank`,
  },
]

export const FilterMenu = observer(() => {
  const employeesState = useContext(EmployeesStateContext)

  const [
    params,
    setParams,
  ] = useSearchParams()

  useEffect(() => {
    employeesState.updateFilterTerm({
      newFilterTerm: params.get(`filter`) || `current`,
    })
  }, [
    employeesState.filterTerm,
  ])

  return (
    <div className="filter-menu">
      {filterElements.map((item) => (
        <button
          type="button"
          className={clsx(`filter-menu__button`, {
            'filter-menu__button--active': item.id === employeesState.filterTerm,
          })}
          key={item.id}
          id={item.id}
          onClick={sortHandler}
        >
          {item.name}
        </button>
      ))}
    </div>
  )

  function sortHandler(event: MouseEvent<HTMLButtonElement>) {
    const buttonId = event.currentTarget.id

    if (buttonId === `current`) {
      params.delete(`filter`)
      setParams(params, {
        replace: true,
      })
    }
    else {
      params.set(`filter`, buttonId)

      setParams(params, {
        replace: true,
      })
    }

    employeesState.updateFilterTerm({
      newFilterTerm: event.currentTarget.id,
    })
  }
})
