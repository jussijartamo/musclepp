import translations from './translations.jsx';
import ls from 'local-storage';
import Immutable from 'immutable';

const initStateFromLocalStorage = ls('musclepp-saved-state')

const defaultState = {
    lang: 'en',
    showKcal: true,
    showKg: false,
    foods: [{n:"raejuusto",s:200.0,p:24,f:2.5,c:5.5}]
};

const now = new Date();

const state = {
    saved: Immutable.Map(initStateFromLocalStorage ? initStateFromLocalStorage : defaultState),
    unsaved: Immutable.Map({
        selectedDay: new Date(),
        now: now,
        month: now.getMonth() + 1,
        year: now.getFullYear()})
};


export default state;