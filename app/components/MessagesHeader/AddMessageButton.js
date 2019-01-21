import React from 'react';

export default props => (
  <button
    type="button"
    onClick={props.onAddClick}
    className="msg_refesh_btn btn btn-info mb-1 mr-2"
  >
    <i className="fas fa-plus-square" />
  </button>
);
