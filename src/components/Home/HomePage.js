import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoHomepage from "./../../assets/video-homepage.mp4";
import { useTranslation, Trans } from "react-i18next";
const HomePage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const nagivate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title_1">{t("homepage.title1")}</div>
        <div className="title_2">{t("homepage.title2")}</div>
        <div className="title_3">
          {isAuthenticated === false ? (
            <button onClick={() => nagivate("/login")}>
              {t("homepage.title3")}
            </button>
          ) : (
            <button onClick={() => nagivate("users")}>
              {t("homepage.button")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
