import * as React from "react";
import * as ReactDOM from "react-dom";

import { AppState } from "./appState";
import { App } from "./components/App";
import './components/style.less';

const init = { lang: 'en', foods: {} };
const now = new Date();
const session = {
    selected: now
};
const state = new AppState(init, session);

ReactDOM.render(
    <App state={state}/>,
    document.getElementById("app")
);
