import * as React from "react";
import { State, Controller } from '../interfaces';

export class Language extends React.Component<{ctrl: Controller},{}> {
    render() {
        const state = this.props.ctrl.getState();
        const setLang = (lang) => state.setLang(lang);
        const update = (state) => this.props.ctrl.update(state);
        const fiSelected = state.getLang() === 'fi' ? 'disabled' : '';
        const enSelected = state.getLang() === 'en' ? 'disabled' : '';
        return  <div className='btn-group'>
                    <button type='button'
                            className={'btn btn-default ' + fiSelected}
                            onClick={() => update(setLang('fi'))}>FI</button>
                    <button type='button'
                            className={'btn btn-default ' + enSelected}
                            onClick={() => update(setLang('en'))}>EN</button>
                </div>
    }
}
