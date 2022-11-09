import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { logout } from "../../services/apiService";
import Language from "./Language";
import { useTranslation, Trans } from "react-i18next";
import ModalHearder from "./ModalHeader";
import { useState } from "react";
const Header = () => {
  const [show, setShow] = useState(false);

  const { t } = useTranslation();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  console.log(account);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegiter = () => {
    navigate("/register");
  };
  const dispatch = useDispatch();
  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  const handleProfile=()=>{
    setShow(true)
  }
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Hỏi Dân IT
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("homepage.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("homepage.user")}
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              {t("homepage.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button onClick={() => handleLogin()} className="btn-login">
                  Log in
                </button>
                <button onClick={() => handleRegiter()} className="btn-signup">
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ModalHearder show={show} setShow={setShow}/>
    </>
  );
};

export default Header;
