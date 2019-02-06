import React from 'react';
import spinnerGif from '../../../images/loadingDots.gif';
const LoadingSpinner = props => (
  <div className="spinnerWrapper">
    <img src={spinnerGif} />
    <h4>Getting your messages...</h4>
  </div>
);

export default LoadingSpinner;
