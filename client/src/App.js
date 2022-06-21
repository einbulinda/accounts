import RouterConfig from "navigation/RouterConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    user && dispatch(authenticate(user));
  }, [dispatch, user]);
  return <RouterConfig />;
}

export default App;
