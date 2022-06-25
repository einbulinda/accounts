import { Suspense } from "react";
import UserAuthPage from "pages/auth/UserAuthPage";
import DashboardPage from "pages/dashboard/DashboardPage";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { url } from "./CONSTANTS";
import NotFoundPage from "./NotFoundPage";
import Loading from "./Loading";
import AddProfile from "pages/profile/AddProfile";

const RouterConfig = () => {
  const { isLoggedIn } = useSelector((state) => state.auth.auth);
  // Private Routes
  const PrivateRoutes = () => {
    return <>{isLoggedIn ? <Outlet /> : <Navigate to={url.LOGIN} />}</>;
  };

  // Restricted Routes
  const RestrictedRoutes = () => {
    return <>{!isLoggedIn ? <Outlet /> : <Navigate to={url.DASHBOARD} />}</>;
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path={url.HOME} element={<Navigate to={url.LOGIN} />} />

          {/* Private Routes */}
          <Route exact element={<PrivateRoutes />}>
            <Route exact path={url.DASHBOARD} element={<DashboardPage />} />
            <Route exact path={url.ADD_PROFILE} element={<AddProfile />} />
          </Route>

          {/* Restricted Routes */}
          <Route exact element={<RestrictedRoutes />}>
            <Route exact path={url.REGISTER} element={<UserAuthPage />} />
            <Route exact path={url.LOGIN} element={<UserAuthPage />} />
          </Route>

          {/* Catch All Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RouterConfig;
