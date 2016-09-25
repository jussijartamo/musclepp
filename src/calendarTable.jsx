import React from 'react';

class CalendarTable extends React.Component {
  render () {
    const state = this.props.state;
    const calendar = this.props.state.calendar;
	const loc = state.locale.bind(state);
	const month = calendar.month;
	const year = calendar.year;
	const days = calendar.daysAroundCurrentMonth();
	const dayComponent = (day,index) => {
        const today = calendar.isNow(day) ? "today" : "";
        return <td className={today} key={"day_"+index}>{day.getDate()}</td>;
    };
	const calendarBody = days.map((week,index) => {
		return <tr key={"week_"+index}>{week.map(dayComponent)}</tr>;
	});
	const nextMonth = () => {
	    calendar.nextMonth();
	    this.forceUpdate();
	};
	const prevMonth = () => {
        calendar.prevMonth();
        this.forceUpdate();
    };
    const changeMonthButtons = (nextMonth,prevMonth) => <div className="pull-right btn-group">
       <button type="button" onClick={prevMonth} className="btn"><i className="fa fa-angle-up fa-lg" aria-hidden="true"></i></button>
       <button type="button" onClick={nextMonth} className="btn"><i className="fa fa-angle-down fa-lg" aria-hidden="true"></i></button>
     </div>;
    const checkbox = (id,description,value,action) => <div className="form-group form-group-sm checkbox">
        <input type="checkbox" className="form-control" id={id} value={value} onClick={action}/>
        <label htmlFor={id}>{description}</label>
      </div>;

    const showKgCheckbox = checkbox("showKgCheckbox", loc("show.kg.checkbox"), calendar.showKg, ()=>{
        calendar.flipShowKg();
    });
    const showKcalCheckbox = checkbox("showKcalCheckbox", loc("show.kcal.checkbox"), calendar.showKcal, ()=>{
        calendar.flipShowKcal();
    });
    return <table className="table calendar table-borderless">
		<thead>
			<tr>
				<th colSpan="7">
					<div className="pull-left">{loc("months")[month-1]}&nbsp;{year}</div>
                    {changeMonthButtons(nextMonth,prevMonth)}
				</th>
			</tr>
			<tr>{loc("week.days").map((d) => <th key={"day_" + d}>{d}</th>)}</tr>
		</thead>
		<tbody>{calendarBody}</tbody>
		<tfoot>
		    <tr>
		        <td colSpan="7">
		            <form className="form-inline pull-left">
                      {showKgCheckbox}&nbsp;{showKcalCheckbox}
                    </form>
		        </td>
		    </tr>
		</tfoot>
	</table>;
  }
}

export default CalendarTable;