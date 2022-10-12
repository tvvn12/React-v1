import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogion } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    //validate
    //submit
    setIsLoading(true);
    let data = await postLogin(email, password);

    if (data && data.EC === 0) {
      dispatch(doLogion(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="header  ">
        <span>Don't have account yet?</span>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </div>

      <div className="title col-4 mx-auto">HoiDanIT</div>
      <div className="welcome col-4 mx-auto">Hello,who's this?</div>

      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type={"email"}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type={"password"}
            className="form-control"
          />
        </div>
        <span className="forgot-password">Forgot Password ?</span>
        <div>
          <button
            disabled={isLoading}
            onClick={() => handleLogin()}
            className="btn-submit"
          >
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Login to HoiDanIT</span>
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60; Go to Homepage
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
