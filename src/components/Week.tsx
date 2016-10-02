import * as React from 'react';
import { Controller } from '../interfaces';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Week extends React.Component<{ctrl: Controller},{}> {
    render() {
        const ctrl = this.props.ctrl;
        const state = this.props.ctrl.getState();
        const week = ctrl.getState().getWeek();
        const week_days = ctrl.text('week.day');
        const months = ctrl.text('week.month');
        const selectedDay = state.getSelectedDay();//week.find( (day) => day.isSelected() );

        const days = week.map((day, index) => {
            const selected = day.isSelected();
            const weekDayTitle = week_days[day.getWeekDayIndex()];
            const date = day.getDate();
            const calories = state.getCalories(day);

            return  <td key={'week-day_' + index}
                        onClick={() => ctrl.update(state.setSelectedDay(day))}
                        className={'text-center ' + (selected?'selected':'')}>
                        <span className='title'>{weekDayTitle}</span><br/>{date}.
                        <br/>{calories != 0 ? <span className='calorie'>{calories}</span> : <span>&nbsp;</span> }
                        {selected ? <div className='arrow-down'/> : null}
                    </td>;
        });

        return <table className='table week'>
            <thead>
                <tr>
                    <th colSpan={7} className='text-center'>
                    {week_days[selectedDay.getWeekDayIndex()]}&nbsp;{selectedDay.getDate()}.&nbsp;{months[selectedDay.getMonthIndex()]}&nbsp;{selectedDay.getYear()}
                    </th>
                </tr>
            </thead>
            <tbody>
                <ReactCSSTransitionGroup
                      component="tr"
                      transitionName="example"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}>
                      {days}
                 </ReactCSSTransitionGroup>
            </tbody>
        </table>;
    }
}
