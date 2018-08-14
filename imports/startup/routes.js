import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import AppContainer from '../ui/App.js';
import { NavBar } from '../ui/App.js';
import TeamContainer from '../ui/Team.js';
import PlayerContainer from '../ui/Player.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
  	<div>
  	<NavBar />
    <Switch>
      <Route exact path='/' component={AppContainer} />
      <Route exact path='/team' component={TeamContainer} />
      <Route exact path='/team/:name' component={PlayerContainer} />
    </Switch>
    </div>
  </Router>
);