import React from 'react'
import HamburgerButton from '../HamburgerButton/index'

const Header = (props) => {

    return (
      <header className="header">
        <nav className="header__nav">
          <div className="header_toggle_btn">
            <HamburgerButton click={props.clickHamburger}/>
          </div>
          <div className="header__logo"><a href="/">LOGO HERE</a></div>
          <div className="spacer"/>
          <div className="header_nav_items">
            <ul>
              <li><a href="/">Colleges</a></li>
              <li><a href="/messages">Messages</a></li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }

export default Header;
