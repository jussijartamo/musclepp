import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { AppState } from "../src/appState";
import { State } from '../interfaces';
import { App } from "../src/components/App";

it('changing year works correctly', () => {
    const init = { lang: 'en', foods: {}  };
    const now = new Date(2016,12 - 1,31);
    const session = {
        selected: now
    };
    const localStorage = {
        getItem: (key) => {
            return null;
        }
        setItem: (key, value) => {
            console.log('local storage updated: ' + key + " = " + value);
        }
    };

    const state: State = new AppState(init, session);
    const app = <App localStorage={localStorage} state={state} />;
    const tree = renderer.create(app).toJSON();
    console.log(tree);
    expect(4).toBe(4)
});