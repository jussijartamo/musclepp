import React from 'react';
import Chart from 'chart.js';
import CalendarTable from './calendarTable.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
  componentDidMount () {
  let chartCanvas = this.refs.chart;
  const data= {
            labels: ["25.9", "26.9", "27.9", "28.9", "29.9", "30.9", "1.10"],
            datasets: [
                {
                    label: "",
                    fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [null, null, 78]
                }
            ]
          };
	let myChart = new Chart(chartCanvas, {
    type: 'line',
    data: data,
    options: {
	    animation: false,
        legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    }
	});
	this.setState({chart: myChart});
  }
  render () {
    const state = this.props.state;
	const loc = state.locale.bind(state);
	const days = state.calendar.daysAroundCurrentMonth();
	const calendarBody = days.map( (week,i) => {
		return <tr key={"week_"+i}>{week.map( (day,i) => {
			return <td key={"day_"+i}>{day.getDate()}</td>;
		})}</tr>;
	});
	
	
	const options =  {
        responsive: false
    };
    return <div>
	<div className="col-md-6">
	        <CalendarTable state={state}/>
	</div>
	<div className="col-md-6"><canvas ref={'chart'}/></div>
	</div>;
  }
}

export default App;