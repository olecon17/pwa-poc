import React from 'react';

const backdrop = props => {
  const backdropClasses = props.sidebarOpen ? 'backdrop open' : 'backdrop';
  return <div className={backdropClasses} onClick={props.clickBackdrop} />;
};

export default backdrop;
