import { Link } from "react-router-dom";
import "./App.scss";
import Header from "./Header/Header";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>test link</div>
      <div>
        <button>
          <Link to="/users"> go to user page</Link>
        </button>
        <button>
          <Link to="/admins"> go to admin page</Link>
        </button>
      </div>
    </div>
  );
};

export default App;
