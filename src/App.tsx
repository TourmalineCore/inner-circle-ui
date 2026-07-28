// import Layout from remote app
import Layout from 'inner_circle_layout_ui/layout'
import { getPageRoutes } from './routes/pageRoutes'
import { authService } from './common/authService'

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <authService.RequireAccessToken>
      <Layout getPageRoutes={getPageRoutes} />
    </authService.RequireAccessToken>
  )
}