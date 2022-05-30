import React, { useEffect, useState } from "react";
import { toggleMobileActiveMenu } from "../../actions/actions";

import './hamburger.scss';
import { connect } from "react-redux";

type HamburgerProps = {
  mobileActiveMenu: boolean
  toggleMobileActiveMenu(currentState: boolean): void
}

const Hamburger: React.FC<HamburgerProps> = ({ mobileActiveMenu, toggleMobileActiveMenu}: HamburgerProps) => {
  const [stateHamburger, setStateHamburger] = useState(false);

  const toggleActiveMenu = () => toggleMobileActiveMenu(!mobileActiveMenu);
  const showHamburger = () => setStateHamburger(window.pageYOffset > 100);
  useEffect(() => {
    window.addEventListener('scroll', showHamburger);
    return () =>  window.removeEventListener('scroll', showHamburger);
  }, [stateHamburger]);

  const hamburgerActive = mobileActiveMenu ? 'hamburger-active' : ''
  const hamburgerShow = stateHamburger ? 'hamburger-show' : '';
  return (
    <ul onClick={toggleActiveMenu}
      className={`hamburger ${hamburgerActive} ${hamburgerShow}`}>
      <li className="hamburger-item" />
    </ul>
  )
};

type HamburgerMapState = {
  currentState: { mobileActiveMenu: boolean }
}

const mapStateToProps = ({ currentState: { mobileActiveMenu } }: HamburgerMapState) => {
  return { mobileActiveMenu };
}

const mapDispatchToProps = { toggleMobileActiveMenu }

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);