import React from 'react';

const ButtonBar = props => (
  <div className="button_bar justify-content-around no-gutters">
    <button className="btn btn-success col-1 message_button">
      <i className="far fa-check-circle" />
    </button>
    <div className="spacer" />
    <button className="btn btn-danger col-1 message_button">
      <i className="fas fa-ban" />
    </button>
  </div>
);

export default ButtonBar;
