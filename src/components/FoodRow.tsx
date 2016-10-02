import * as React from "react";
import {EditableCell} from './EditableCell';
import { State, Controller, Food, Day } from '../interfaces';

export class FoodRow extends React.Component<{day: Day, index?: number, food?: Food, ctrl: Controller},{}> {
    render() {
        const ctrl = this.props.ctrl;
        const state = ctrl.getState();
        const foodLabel = ctrl.text('foods.unselected.label');
        const addNewFood = () => {
            const newFood: Food = {name: '',
                             calories: 0,
                             serving: 100,
                             carbs: 0,
                             fats: 0,
                             protein: 0};
            const newState = state.addFood(this.props.day, newFood);
            ctrl.update(newState);
            /*
            //console.log(newState);
            */
        };
        const unselected = <tr>
                            <td colSpan={7} className='text-center selectable' onClick={() => addNewFood()}>
                                {foodLabel}&nbsp;<span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </td>
                           </tr>;
        const remove = () => {
            const newState = state.removeFood(this.props.day, this.props.index);
            ctrl.update(newState);
        };
        const onNumber = (value, callback) => {
            const maybeNumber = Number(value);
            if(!isNaN(maybeNumber)) {
                callback(maybeNumber);
                return true;
            } else {
                return false;
            }
        };
        const updateName = (value) => {
            const food = this.props.food;
            food.name = value;
            ctrl.update(state.setFood(this.props.day,food,this.props.index));
            return true;
        };
        const updateCalories = (value) => {
            return onNumber(value, (someNumber) => {
                const food = this.props.food;
                food.calories = someNumber;
                ctrl.update(state.setFood(this.props.day,food,this.props.index));
            });
        };
        const updateServing = (value) => {
            return onNumber(value, (someNumber) => {
                const food = this.props.food;
                food.serving = someNumber;
                ctrl.update(state.setFood(this.props.day,food,this.props.index));
            });
        };
        const updateProtein = (value) => {
            return onNumber(value, (someNumber) => {
                const food = this.props.food;
                food.protein = someNumber;
                ctrl.update(state.setFood(this.props.day,food,this.props.index));
            });
        };
        const updateFats = (value) => {
            return onNumber(value, (someNumber) => {
                const food = this.props.food;
                food.fats = someNumber;
                ctrl.update(state.setFood(this.props.day,food,this.props.index));
            });
        };
        const updateCarbs = (value) => {
            return onNumber(value, (someNumber) => {
                const food = this.props.food;
                food.carbs = someNumber;
                ctrl.update(state.setFood(this.props.day,food,this.props.index));
            });
        };
        const selected = (food) => <tr>
                          {food.name === '' ? <EditableCell updater={updateName} classNames='selectable' placeholder={ctrl.text('foods.no_name')}/> :
                             <EditableCell updater={updateName} classNames='selectable' value={food.name}/>
                          }
                          <EditableCell updater={updateCalories} classNames='text-center calorie selectable' value={food.calories}/>
                          <EditableCell updater={updateServing} classNames='text-center gram selectable' value={food.serving}/>
                          <EditableCell updater={updateProtein} classNames='text-center gram selectable' value={food.protein}/>
                          <EditableCell updater={updateFats} classNames='text-center gram selectable' value={food.fats}/>
                          <EditableCell updater={updateCarbs} classNames='text-center gram selectable' value={food.carbs}/>
                          <td onClick={() => remove()} className='text-center selectable small'><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
                         </tr>;
        return this.props.food != null ? selected(this.props.food) : unselected;
    }
}
