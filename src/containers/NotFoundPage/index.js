/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';


/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {
  render() {
    return (
      <img
        className="mx-auto d-block"
        src="https://66.media.tumblr.com/8d1bdbf68a0370c62310ead55bbf3fd9/tumblr_ntqxneRHQr1udik9co2_1280.jpg"
      />
    );
  }
}
