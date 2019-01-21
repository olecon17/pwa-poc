import React from 'react'

const backdrop = (props) => {
  let backdropClasses = props.sidebarOpen ? "backdrop open" : "backdrop";
  return (
    <div className={backdropClasses} onClick={props.clickBackdrop}></div>
  )
}

export default backdrop;
