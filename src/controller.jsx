import translations from './translations.jsx';
import ls from 'local-storage';
import Immutable from 'immutable';

const controller = (state) => {
    return {
        getLanguage: () => state.saved.get('lang'),
        setLanguage: (lang) => {
            return {'saved':state.saved.set('lang',lang)};
        },
        getFoods: () => state.saved.get('foods')
    };
};


export default controller;