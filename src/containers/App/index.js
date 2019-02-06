/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/index';
import NotFoundPage from '../NotFoundPage/index';
import NavigationContainer from './NavigationContainer/index';
import '../../styles/custom.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id="content"
        style={{ height: '100%' }}
        className="w-100 bg-grey-back"
      >
        <NavigationContainer />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
