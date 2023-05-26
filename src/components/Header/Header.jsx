import React, { useState } from 'react';
import Logo from 'components/Logo/Logo';
import Nav from 'components/Nav/Nav';
import css from './Header.module.scss';
import menuHam from 'images/menu-hamburger.svg';
import closeIcon from 'images/cross-small.svg';
import AuthNav from '../Nav/AuthNav/AuthNav';
import UserNav from '../Nav/UserNav/UserNav';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import userIcon from 'images/user-1.svg';
import pawprint from 'images/pawprint.svg';
import logo from '../../images/logo.svg';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
    !isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  };
  const { isLoggedIn } = useAuth();

  return (
    <div className={css.headerStyle}>
      <div className={css.header}>
        <Logo />

        <Nav />
        <div className={css.nav}>
          {isLoggedIn ? <UserNav /> : <AuthNav />}
          <button
            className={css.menuIcon}
            onClick={toggle}
            aria-label="mobile menu"
          >
            {isOpen ? (
              <img className={css.menuBur} src={closeIcon} alt="menuBurger" />
            ) : (
              <img className={css.menuBur} src={menuHam} alt="menuBurger" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className={css.burger}>
            <div className={css.listMenu}>
              <NavLink to="/">
                <img className={css.logo} src={logo} alt="YOUR PET" />
              </NavLink>
              ;
              {isLoggedIn ? (
                <div className={css.authNavigate}>
                  <NavLink
                    className={css.iconMob}
                    to="/user"
                    onClick={toggle}
                    style={{ width: 164 }}
                  >
                    <img className={css.icon} src={userIcon} alt="userIcon" />
                  </NavLink>
                </div>
              ) : (
                <div className={css.authNavigateMob}>
                  <NavLink
                    className={css.login}
                    to="/login"
                    onClick={toggle}
                    style={{ width: 165 }}
                  >
                    LogiIN
                    <img className={css.icon} src={pawprint} alt="pawprint" />
                  </NavLink>
                  <NavLink
                    className={css.register}
                    to="/register"
                    onClick={toggle}
                    style={{ width: 165 }}
                  >
                    Registation
                  </NavLink>
                </div>
              )}
              
              <div className={css.navdiv}>
              <NavLink to="/">
                <img className={css.logoTab} src={logo} alt="YOUR PET" />
              </NavLink>
                <NavLink className={css.link} to="/news" onClick={toggle}>
                  News
                </NavLink>
                <NavLink
                  className={css.link}
                  to="/notices/sell"
                  onClick={toggle}
                >
                  Find pet
                </NavLink>
                <NavLink className={css.link} to="/friends" onClick={toggle}>
                  Our friends
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
