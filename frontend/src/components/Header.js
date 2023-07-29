import logo from '../images/logo.svg';
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Header(props) {
  return (
    <header className="header content">
      <img src={logo} alt="Лого" className="header__logo" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="header__info">
                <span className="header__email">{props.userEmail}</span>
                <button
                  className="header__link"
                  type="button"
                  onClick={props.onLogOut}
                >
                  Выйти
                </button>
              </div>
            </>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;





