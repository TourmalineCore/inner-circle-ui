import { Location } from 'history'
import { useState, useEffect } from 'react'
import { SidebarRoutesProps } from '../../types'
import { SidebarProps } from '../types/Template'

export function useSidebarRoutes(initialRoutes: SidebarRoutesProps[], location: Location) {
  const [
    routes,
    setRoutes,
  ] = useState(adaptRoutesByLocation({
    routes: initialRoutes,
    location, 
  }))

  useEffect(() => {
    setRoutes((prevRoutesState) => adaptRoutesByLocation({
      routes: prevRoutesState,
      location, 
    }))
  }, [
    location,
  ])

  return routes
}

function adaptRoutesByLocation({
  routes = [], location, 
}: { routes?: SidebarProps[] | SidebarRoutesProps[], location: Location, }): SidebarProps[] {
  return routes.map((route) => ({
    ...route,
    isActive: isRouteActive(route.path, location),
    isNestedRoutesCollapsed: getItemCollapsedState({
      nestedRoutes: route.routes,
      location, 
    }),
    routes: adaptRoutesByLocation({
      routes: route.routes,
      location, 
    }),
  }))
}

function isRouteActive(routePath: string, location: Location) {
  return location.pathname.endsWith(routePath) || location.pathname.includes(`${routePath}/`)
}

function getItemCollapsedState({
  nestedRoutes = [], location, 
}: { nestedRoutes?: SidebarRoutesProps[] | SidebarProps[], location: Location, }) {
  return !nestedRoutes.some((item) => location.pathname.includes(item.path))
}
