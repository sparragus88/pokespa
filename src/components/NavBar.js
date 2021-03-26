import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Cookies from "js-cookie";

function NavBar(props) {
  const [click, setClick] = useState(false);

  const handlerClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const auth = props.auth;

  const [fullName, setFullName] = useState("");

  const removeData = (e) => {
    e.preventDefault();
    Cookies.remove("PokeSPA-user");
    Cookies.remove("PokeSPA-pokemonOwned");
    window.location = "/";
  };

  const getUser = () => {
    const user = Cookies.get("PokeSPA-user");
    if (user) {
      setFullName(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            pokeSPA{" "}
            <img
              className="logo"
              src="/pikachu.svg"
              height="42"
              width="42"
              alt="pikachu_image"
            />
          </Link>
          {auth && (
            <>
              <div className="menu-icon" onClick={handlerClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
              </div>
            </>
          )}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {auth && (
            <>
              <li className="nav-item nav-user">
                <div className="user-info">
                  <div className="info-label">Name</div>
                  <div className="info-divider">:</div>
                  <div className="info-content">{fullName}</div>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  to="/pokemon-list"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Pokemon List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/my-pokemon"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  My Pokemon
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-links nav-remove"
                  onClick={removeData}
                >
                  Remove My Data
                  <span className="notice">
                    will bring you back
                    <br /> to input name <br /> and <br /> erase all data
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
