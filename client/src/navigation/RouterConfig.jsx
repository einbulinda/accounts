import { Suspense, lazy } from "react";
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

// Pages
const AddProfile = lazy(() => import("pages/profile/AddProfile"));
const UserAuthPage = lazy(() => import("pages/auth/UserAuthPage"));
const DashboardPage = lazy(() => import("pages/dashboard/DashboardPage"));
const NewAccount = lazy(() => import("pages/accounts/NewAccount"));
const AddVatData = lazy(() => import("pages/vat/AddVatData"));
const AddPayePage = lazy(() => import("pages/paye/AddPayePage"));
const AddExpenses = lazy(() => import("pages/expenses/AddExpenses"));
const AddAssets = lazy(() => import("pages/ppe/AddAssets"));
const SettingsPage = lazy(() => import("pages/settings/SettingsPage"));
const AllProfiles = lazy(() => import("pages/profile/AllProfiles"));
const EditProfile = lazy(() => import("pages/profile/EditProfile"));

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
            <Route exact path={url.PROFILES} element={<AllProfiles />} />
            <Route exact path={url.EDIT_PROFILE} element={<EditProfile />} />
            <Route exact path={url.ADD_ACCOUNT} element={<NewAccount />} />
            <Route exact path={url.VAT_RETURN} element={<AddVatData />} />
            <Route exact path={url.ADD_PAYE} element={<AddPayePage />} />
            <Route exact path={url.ADD_EXPENSES} element={<AddExpenses />} />
            <Route exact path={url.NEW_ASSETS} element={<AddAssets />} />
            <Route exact path={url.SETTINGS} element={<SettingsPage />} />
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
