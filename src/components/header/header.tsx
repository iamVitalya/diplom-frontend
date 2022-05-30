import React, { useContext, useEffect, useReducer } from "react";

import './header.scss';
import CartButton from "../cart-button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../assets/image/logo.png";
import useAuth from "../../hook/auth";
import { AuthContext } from "../context/auth";

type HeaderPropsType = {
  fullOrderPrice: number,
  fullOrderAmount: number
}

const Header: React.FC<HeaderPropsType> = ({fullOrderPrice, fullOrderAmount}: HeaderPropsType) => {
  const match = useLocation();
  const { token } = useAuth();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const isAuthenticated = auth.isAuthenticated;

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    auth.isAuthenticated = false;
    auth.logout()
    history.push('/')
  }

  const hideLink = (path: string) => {
    if(match.pathname === path) {
      return 'hide'
    }

    return;
  }

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to='/' className="logo" title="Перейти на главную страницу">
          <img src={logo} alt="Роллы"/>

          <div className="logo__description">
            <h1 className="logo__title">React Sushi</h1>
            <span className="logo__subtitle">Лучшие суши и роллы </span>
          </div>
        </Link>
        <nav style={{ display: 'flex' }}>
          <Link to='/cart-page' className="header-link" style={{ marginRight: '10px' }}>
            <CartButton price={fullOrderPrice} amount={fullOrderAmount} />
          </Link>
          { isAuthenticated ?
            (
              <span>
                <button
                  className="button sushi-list-item__button"
                  style={{
                    padding: '10px 20px',
                    margin: '0',
                    minHeight: '50px',
                  }}
                  onClick={logoutHandler}
                >
                <span className="sushi-list-item__main">Выйти</span>
              </button>
              </span>
            )
            :
            (
            <Link to='/auth-page' className={['header-link', hideLink('/auth-page')].join(' ')}>
              <button className="button sushi-list-item__button" style={{
                padding: '10px 20px',
                margin: '0',
                minHeight: '50px',
              }}>
                <span className="sushi-list-item__main">Войти</span>
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

type MapStateToPropsState = {
  shoppingCart: {
    fullOrderPrice: number
    fullOrderAmount: number
  }
}

const mapStateToProps = ({shoppingCart: {fullOrderPrice, fullOrderAmount}}: MapStateToPropsState) => {
  return {fullOrderPrice, fullOrderAmount}
}

export default connect(mapStateToProps)(Header);