import { RequireAccessToken } from './routes/authStateProvider/requireAccessToken'
// import Layout from remote app
import Layout from 'inner_circle_layout_ui/layout'
import { getPageRoutes } from './routes/pageRoutes'

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <RequireAccessToken>
      <Layout getPageRoutes={getPageRoutes} />
    </RequireAccessToken>
  )
}