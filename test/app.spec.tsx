import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { AppState } from "../src/appState";
import { App } from "../src/components/App";

it('subtracts 5 - 1 to equal 4 in TypeScript', () => {
    const init = { lang: 'en'  };
    const now = new Date();
    const session = {
        selected: now
    };

    const state = new AppState(init, session);
    const app = <App state={state} />;
    const tree = renderer.create(app).toJSON();
    console.log(tree);
    expect(4).toBe(4)
});