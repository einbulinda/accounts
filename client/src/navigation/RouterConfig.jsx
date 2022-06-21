import UserAuthPage from "pages/auth/UserAuthPage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { url } from "./CONSTANTS";

const RouterConfig = () => {
  // Restricted Routes
  const RestrictedRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.auth.auth);
    return <>{!isLoggedIn ? <Outlet /> : <Navigate to={url.DASHBOARD} />}</>;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={url.HOME} element={<Navigate to={url.LOGIN} />} />

        {/* Restricted Routes */}
        <Route exact element={<RestrictedRoutes />}>
          <Route exact path={url.REGISTER} element={<UserAuthPage />} />
          <Route exact path={url.LOGIN} element={<UserAuthPage />} />
        </Route>

        {/* Catch All Route */}
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
