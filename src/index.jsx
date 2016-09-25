import React from 'react';
import {render} from 'react-dom';
import state from './state.jsx';
import App from './app.jsx';


render(<App state={state} />, document.getElementById('app'));