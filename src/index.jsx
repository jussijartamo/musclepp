import React from 'react';
import {render} from 'react-dom';
import State from './state.jsx';
import App from './app.jsx';

const state = new State(new Date(), "en", (state) => render(<App state={state} />, document.getElementById('app')));

state.updateCallback(state);
