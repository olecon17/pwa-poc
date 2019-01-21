import React from 'react';

export default props => (
  <button
    type="button"
    onClick={props.onRefreshClick}
    className="msg_refesh_btn btn btn-primary mb-1"
  >
    <i className="fas fa-sync-alt" />
  </button>
);
