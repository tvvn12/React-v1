import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogion } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import Language from "../Header/Language";
import { useTranslation, Trans } from "react-i18next";
const Login = (props) => {
  const { t } = useTranslation();

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
    console.log(data);
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
  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
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
          {t("Auth.signup")}
        </button>
        <Language />
      </div>

      <div className="title col-4 mx-auto">HoiDanIT</div>
      <div className="welcome col-4 mx-auto">Hello,who's this?</div>

      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label> {t("Auth.email")}</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type={"email"}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label> {t("Auth.password")}</label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type={"password"}
            className="form-control"
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>
        <span className="forgot-password"> {t("Auth.forgot")}</span>
        <div>
          <button
            disabled={isLoading}
            onClick={() => handleLogin()}
            className="btn-submit"
          >
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>{t("Auth.button")}</span>
          </button>
        </div>
        <div className="text-center">
          <span className="back" onClick={() => navigate("/")}>
            &#60;&#60; {t("Auth.back")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
