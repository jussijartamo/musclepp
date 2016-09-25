import React from 'react';
import localeHandler from './translations.jsx';

class AddFoodForm extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {name:"", serving: "", fats: "", carbs: "", protein: ""};
    }
    formGroup(id, label, onchange, value, placeholder, addon) {
            const inputAddon = addon ? <span className="input-group-addon">{addon}</span> : null;
            return <div className="form-group">
               <label htmlFor={id} className="col-md-4 control-label">{label}</label>
               <div className="col-md-8">
                 <div className="input-group">
                    <input type="text" value={value} onChange={onchange} className="form-control" id={id} placeholder={placeholder}></input>
                    {inputAddon}
                 </div>
               </div>
            </div>;
    }
    numbers(i) {
        var r = i ? i : "";
        return r.replace(/[^0-9.]/g, '');
    }
    onChangeName(event) {
        this.setState({'name': event.target.value})
    }
    onChangeServing(event) {
        this.setState({'serving': this.numbers(event.target.value)})
    }
    onChangeProtein(event) {
        this.setState({'protein': this.numbers(event.target.value)})
    }
    onChangeFats(event) {
        this.setState({'fats': this.numbers(event.target.value)})
    }
    onChangeCarbs(event) {
        this.setState({'carbs': this.numbers(event.target.value)})
    }
    render() {
        let update = this.props.update;
        let state = this.props.state;
        const close = () => update({unsaved: state.unsaved.delete('showAddFoodForm')});
        let locale = localeHandler(this.props.state.saved.get('lang'));
        const isValid = this.state.name != "" && this.state.name != undefined && !(this.state.serving === "0");
        const submit = () => {
            const food = {
                'n': this.state.name,
                's': this.state.serving,
                'p': this.state.protein,
                'f': this.state.fats,
                'c': this.state.carbs
            };
            update({saved: state.saved.updateIn(['foods'], list => {
                let l = list ? list : [];
                l.push(food)
                return l;
            })});
            close();
        };
        return <div>
           <h2>{locale('add.food.form.header')} <small><a href="#" onClick={close}>{locale('day.form.close')}</a></small></h2>
           <div className="row">
           <div className="col-md-6">
           <form className="form-horizontal">
                {this.formGroup("name", locale('add.food.form.name'), this.onChangeName.bind(this), this.state.name, "")}
                {this.formGroup("serving", locale('add.food.form.serving'), this.onChangeServing.bind(this), this.state.serving, locale('add.food.form.serving.placeholder'),locale('add.food.form.unit'))}
                {this.formGroup("protein", locale('add.food.form.protein'), this.onChangeProtein.bind(this), this.state.protein, locale('add.food.form.protein.placeholder'),locale('add.food.form.unit'))}
                {this.formGroup("carbs", locale('add.food.form.carbs'), this.onChangeCarbs.bind(this), this.state.carbs, locale('add.food.form.carbs.placeholder'),locale('add.food.form.unit'))}
                {this.formGroup("fats", locale('add.food.form.fats'), this.onChangeFats.bind(this), this.state.fats, locale('add.food.form.fats.placeholder'),locale('add.food.form.unit'))}
                <div className="form-group">
                <div className="btn-group col-md-offset-4 col-md-10">
                    <button className={"btn " + (isValid ? "" : "disabled")} onClick={submit} type="button">{locale('add.food.form.submit')}</button>
                    <button className="btn" type="button" onClick={close}>{locale('add.food.form.cancel')}</button>
                </div>
                </div>
           </form>
           </div>
           </div>
        </div>;
    }
}

export default AddFoodForm;