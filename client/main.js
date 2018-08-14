import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/routes.js';

import '../imports/startup/accounts-config.js';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});