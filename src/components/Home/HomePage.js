import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoHomepage from "./../../assets/video-homepage.mp4";
const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const nagivate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title_1">There's a better way to ask</div>
        <div className="title_2">
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead—and make everyone happy.
        </div>
        <div className="title_3">
          {isAuthenticated === false ? (
            <button onClick={() => nagivate("/login")}>
              Get's started. Its's free
            </button>
          ) : (
            <button onClick={() => nagivate("users")}>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
