import React from 'react';

const ButtonBar = props => {
  const acceptedClassNames = props.accepted
    ? 'btn btn-outline-success col-1 message_button accept_btn'
    : 'btn btn-success col-1 message_button accept_btn';
  const rejectedClassNames = props.rejected
    ? 'btn btn-outline-danger col-1 message_button reject_btn'
    : 'btn btn-danger col-1 message_button reject_btn';
  return (
    <div className="button_bar justify-content-around no-gutters">
      <p>{this}</p>
      <button
        className={acceptedClassNames}
        onClick={props.acceptClick.bind(this, props.message)}
      >
        <i className="fas fa-check-circle" />
      </button>
      <div className="spacer" />
      <button
        className={rejectedClassNames}
        onClick={props.declineClick.bind(this, props.message)}
      >
        <i className="fas fa-ban" />
      </button>
    </div>
  );
};

export default ButtonBar;
