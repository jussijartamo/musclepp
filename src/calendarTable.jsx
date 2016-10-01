import React from 'react';
import calendarHandler from './calendar.jsx';
import localeHandler from './translations.jsx';
import ctrl from './controller.jsx';

class CalendarTable extends React.Component {
  changeMonthButtons(nextMonth,prevMonth) {
    return <div className="pull-right btn-group">
      <button type="button" onClick={prevMonth} className="btn"><i className="fa fa-angle-up fa-lg" aria-hidden="true"/></button>
      <button type="button" onClick={nextMonth} className="btn"><i className="fa fa-angle-down fa-lg" aria-hidden="true"/></button>
    </div>;
  }
  checkbox(id,description,value,action) {
    return <div className="form-group form-group-sm checkbox">
       <input type="checkbox" className="form-control" id={id} checked={value} onChange={action}/>
       <label htmlFor={id}>{description}</label>
     </div>;
  }
  render () {
    const update = this.props.update;
    const state = this.props.state;
    const calendar = calendarHandler(this.props.state);
    const locale = localeHandler(state);

	const days = calendar.daysAroundCurrentMonth();
	const dayComponent = (day,index) => {
        const today = calendar.isNow(day) ? "today" : "";
        return <td onClick={() => update(calendar.selectDay(day))} className={today} key={"day_"+index}>{day.getDate()}</td>;
    };
	const calendarBody = days.map((week,index) => {
		return <tr key={"week_"+index}>{week.map(dayComponent)}</tr>;
	});
    const showKgCheckbox = this.checkbox('showKgCheckbox', locale('show.kg.checkbox'), calendar.showKg, ()=>{
        update(calendar.flipShowKg());
    });
    const showKcalCheckbox = this.checkbox('showKcalCheckbox', locale('show.kcal.checkbox'), calendar.showKcal, ()=>{
        update(calendar.flipShowKcal());
    });
    return <table className="table calendar table-borderless">
		<thead>
			<tr>
				<th colSpan="7">
					<div className="pull-left">{locale('months')[calendar.month()-1]}&nbsp;{calendar.year()}</div>
                    {this.changeMonthButtons(
                        () => update(calendar.nextMonth()),
                        () => update(calendar.prevMonth()))}
				</th>
			</tr>
			<tr>{locale('week.days').map((d) => <th key={"day_" + d}>{d}</th>)}</tr>
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