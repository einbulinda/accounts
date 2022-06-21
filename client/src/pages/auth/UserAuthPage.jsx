import "./UserStyles.scss";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { url } from "../../navigation/CONSTANTS";
import SigninForm from "components/SigninForm";
import RegisterForm from "components/RegisterForm";

const UserAuthPage = () => {
  const [signIn, setSignIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/login") {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  }, [location, navigate]);

  return (
    <div className="container">
      <main className={signIn ? "slideRight" : ""}>
        {signIn ? <SigninForm /> : <RegisterForm />}
      </main>
      <aside className={signIn ? "slideLeft" : ""}>
        {/* Sign in Block Aside */}
        <div className="sign-in-block">
          <h2>Already a User?</h2>
          <Button
            type="submit"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              padding: "1em 3.5em",
            }}
            onClick={() => {
              navigate(url.LOGIN);
            }}
          >
            Login
          </Button>
        </div>

        {/* Sign Up Block Aside */}
        <div className="sign-up-block">
          <h2>New User?</h2>
          <Button
            type="submit"
            sx={{
              color: "#fff",
              border: "2px solid #fff",
              padding: "1em 3.5em",
            }}
            onClick={() => {
              navigate(url.REGISTER);
            }}
          >
            Create Account
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default UserAuthPage;
