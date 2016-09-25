import React from 'react';
import Chart from 'chart.js';
import CalendarTable from './calendarTable.jsx'
import DayForm from './dayForm.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddFoodForm from './addFoodForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }
  update(state) {
    console.log(state);
    this.setState(state);
  }
  render () {
    const state = this.state;
    const update = this.update.bind(this);
    const isDaySelected = state.unsaved.get('selectedDay') != undefined ? true : false;
    const isAddFoodForm = state.unsaved.get('showAddFoodForm') === true ? true : false;
    var mainComponent = null;
    if(isAddFoodForm) {
        mainComponent = <AddFoodForm update={update} state={state}/>;
    } else if(isDaySelected) {
        mainComponent = <DayForm update={update} state={state}/>;
    } else {
        mainComponent = <CalendarTable update={update} state={state}/>;
    }

    return <div>
        <div className="col-md-12">{mainComponent}</div>
	</div>;
  }
}

export default App;