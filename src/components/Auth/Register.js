import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import { AiOutlineEye } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { useTranslation, Trans } from "react-i18next";
import "./Register.scss";
import Language from "../Header/Language";
const Register = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async () => {
    let data = await postRegister(email, password, username);
    console.log(data);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="resgiter-container d-flex">
      <div className="content-form-left col-6">
        <div className="title">
          "{t("Register.title")} <b>{t("Register.b")} </b>{" "}
          {t("Register.title_1")} "
        </div>
      </div>
      <div className="content-form-right col-6 d-flex flex-column  ">
        <div className="header">
          <span>Don't have account yet?</span>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
          <Language />
        </div>
        <div className="title_header text-center">
          <h1>Typeform</h1>
        </div>
        <div className="title text-center">{t("Register.title_3")}</div>
        <div className="register-form mx-auto">
          <div className="form-group">
            <label> {t("Register.email")}(*)</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group input-form-icon">
            <label> {t("Register.password")}(*) </label>
            <input
              value={password}
              type={passwordShow ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
            />
            <span className="icon">
              {passwordShow ? (
                <BsEyeSlash onClick={() => setPasswordShow(!passwordShow)} />
              ) : (
                <AiOutlineEye onClick={() => setPasswordShow(!passwordShow)} />
              )}
            </span>
          </div>
          <div className="form-group">
            <label>{t("Register.name")}</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <button className="btn-register" onClick={() => handleRegister()}>
              {t("Register.button")}
            </button>
            <span className="back" onClick={() => navigate("/")}>
              &#60;&#60; {t("Register.back")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
