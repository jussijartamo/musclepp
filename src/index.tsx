import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppState } from './appState';
import { App } from './components/App';
import { State, LocalStorage } from './interfaces';

import './components/style.less';

const localStorage: LocalStorage = {
    getItem(key: string): {[key:string]:any} {
        return JSON.parse(window.localStorage.getItem(key));
    },
    setItem(key: string, value:any): void {
        console.log('saving key ' + key);
        window.localStorage.setItem(key,JSON.stringify(value));
    }
};
//let saved: {[key:string]:any} =
//saved = saved ? saved : { lang: 'en', foods: {} };
//console.log(saved);

let init: any = localStorage.getItem('saved');
if(!init) {
    init = { lang: 'en', foods: {} };
}
const now = new Date();
const session = {
    selected: now
};
const state = new AppState(init, session);

ReactDOM.render(
    <App localStorage={localStorage} state={state}/>,
    document.getElementById("app")
);
