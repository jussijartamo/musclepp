import React from 'react';
import calendarHandler from './calendar.jsx';
import localeHandler from './translations.jsx';
import FoodTable from './foodTable.jsx';
import {Glyphicon} from 'react-bootstrap';

class DayForm extends React.Component {
    formGroup(id, label, callback, placeholder, addon, more) {
        const inputAddon = addon ? <span className="input-group-addon">{addon}</span> : null;
        return <div className="form-group">
           <label htmlFor={id} className="col-md-4 control-label">{label}</label>
           <div className="col-md-5">
             <div className="input-group">
                <input type="text" onClick={callback} className="form-control" id={id} placeholder={placeholder}/>
                {inputAddon}
             </div>
           </div>
             {more}
        </div>;
    }
    getOrEmptyList(list) {
        if(list) {
            return list;
        } else {
            return [];
        }
    }
    formGroupOnlyComponent(component) {
        return <div className="form-group">
            <label className="col-sm-4 control-label"></label>
            <div className="col-sm-8">{component}</div>
        </div>;
    }
    search(locale, hasSomethingToSearch, addFoodCallback) {
        const c = hasSomethingToSearch ? <div className="form-group">
             <label htmlFor="search" className="col-sm-4 control-label">{locale('day.form.search')}</label>
             <div className="col-sm-5">
                 <input type="text" className="form-control" id="search" placeholder=""/>
             </div>
             <div className="col-sm-3 control-label">
                 <a href="#" onClick={addFoodCallback}>{locale('day.form.search.add')}</a>
             </div>
         </div> : this.formGroupOnlyComponent(<a href="#" onClick={addFoodCallback}>{locale('day.form.search.add')}</a>);
        return c;
    }
    render() {
        const update = this.props.update;
        const state = this.props.state;
        const calendar = calendarHandler(this.props.state);
        const locale = localeHandler(state);
        const selectedDay = calendar.selectedDay();
        const hasFoodItems = this.getOrEmptyList(state.saved.get('foods')).length != 0;
        const date = selectedDay.getDate() + '. ' + locale('months')[selectedDay.getMonth()] + ' ' + selectedDay.getFullYear();
        const close = <button onClick={() => update(calendar.selectDay(null))} className="btn" type="button"><i className="fa fa-close fa-lg" aria-hidden="true"></i></button>
        const addFoodCallback = () => update({unsaved: state.unsaved.set('showAddFoodForm', true)});
        const addFoodComponent = <a href="#" onClick={addFoodCallback}>{locale('day.form.search.add')}</a>;
        return <div>
        <div className="row">
        <div className="col-md-offset-6 col-md-6 text-center">
            <button type='button' className='btn close pull-right' onClick={() => update(calendar.selectDay(null))}>&times;</button>
            <h2>{date}</h2>
        </div>
        <div className="col-md-6">
            <div className="row">
            <form className="form-horizontal">
                {hasFoodItems ? this.formGroup("search", locale("day.form.search"), null, null, null, <div className="col-md-3 pull-left"><div className="control-label pull-left">{addFoodComponent}</div></div>) :
                this.formGroupOnlyComponent(addFoodComponent)}
            </form>
            </div>
            <div className="row">
                <FoodTable state={state}/>
            </div>
        </div>
        <div className="col-md-6">

            <form className="form-horizontal">
                {this.formGroup("weight", locale("day.form.weight"), locale("day.form.weight.placeholder"), null, locale("day.form.weight.unit"))}
            </form>
        </div>
        </div>
        </div>;
    }
};

export default DayForm;