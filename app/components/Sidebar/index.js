import React from 'react'

const sideDrawer = props => {
  let sidebarClasses = props.sidebarOpen ? 'sidebar open' : 'sidebar'
  return (
    <nav className={sidebarClasses}>
      <ul>
        <li>
          <a href="/">Colleges</a>
        </li>
        <li>
          <a href="/messages">Messages</a>
        </li>
      </ul>
    </nav>
  )
}

export default sideDrawer;
