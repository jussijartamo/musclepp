import * as React from 'react';
import { Week } from './Week';
import { Brand } from './Brand';
import { Language } from './Language';
import { Foods } from './Foods';
import { State, Controller } from '../interfaces';
import { text } from '../translations';

export class App extends React.Component<{state: State},{appState: State}> implements Controller {
    constructor(props : {state: State}) {
        super(props);
        const state = this.props.state;
        this.state = {appState: state};
    }

    update(state: State): void {
        console.log(state);
        this.setState({appState: state});
    }
    getState(): State {
        return this.state.appState;
    }
    text(key: string): any {
        const lang = this.state.appState.getLang();
        return text(lang)(key);
    }

    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-md-2'><Brand/></div>
                <div className='col-md-offset-8 col-md-2'><Language ctrl={this}/></div>
            </div>
            <div className='row'>
                <div className='col-md-offset-2 col-md-8'>

                    <Week ctrl={this}/>
                </div>
                <div className='col-md-offset-2 col-md-8'>
                    <Foods ctrl={this}/>
                </div>
            </div>
        </div>;
    }
}
