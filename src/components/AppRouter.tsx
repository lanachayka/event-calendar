import { Routes, Route, Navigate } from "react-router-dom"
import { privateRoutes, publicRoutes, RouteNames } from "../router";

const AppRouter: React.FC = () => {
  const auth = true;
  return (
    auth
      ? <Routes>
        {privateRoutes.map(route =>
          <Route key={route.path} path={route.path} element={route.element} />
        )}
        <Route path='*' element={<Navigate to={RouteNames.EVENT} />} />
      </Routes>
      : <Routes>
        {publicRoutes.map(route =>
          <Route key={route.path} path={route.path} element={route.element} />
        )}
        <Route path='*' element={<Navigate to={RouteNames.LOGIN} />} />
      </Routes>
  )
}

export default AppRouter