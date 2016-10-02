import * as React from "react";
import { State, Controller } from '../interfaces';
import {FoodRow} from './FoodRow';

export class Foods extends React.Component<{ctrl: Controller},{}> {
    render() {
        const ctrl = this.props.ctrl;
        const state = this.props.ctrl.getState();
        const selectedDay = state.getSelectedDay();
        const foods = state.getFoods(selectedDay);
        const tbody = foods.map((food, index) => {
            return <FoodRow key={'foodrow_'+index} day={selectedDay} index={index} food={food} ctrl={this.props.ctrl} />
        });

        return <table className='table'>
                   <thead>
                        {foods.length == 0 ? null : <tr>
                           <th className='title col-md-4'>{ctrl.text('foods.name')}</th>
                           <th className='title'>{ctrl.text('foods.calories')}</th>
                           <th className='title'>{ctrl.text('foods.serving')}</th>
                           <th className='title'>{ctrl.text('foods.protein')}</th>
                           <th className='title'>{ctrl.text('foods.fats')}</th>
                           <th className='title'>{ctrl.text('foods.carbs')}</th>
                           <th className='title'><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></th>
                       </tr>}
                   </thead>
                   <tbody>
                       {tbody}
                       <FoodRow key={'foodrow_add_new'} day={selectedDay} ctrl={this.props.ctrl} />
                       {foods.length == 0 ? null : <tr>
                           <td className='pull-right title'>{ctrl.text('foods.total')}</td>
                           <td className='calorie text-center'>{foods.reduce((sum, food) => (food.calories ? food.calories: 0) + sum, 0)}</td>
                           <td className='gram text-center'>{foods.reduce((sum, food) => (food.serving ? food.serving: 0) + sum, 0)}</td>
                           <td className='gram text-center'>{foods.reduce((sum, food) => (food.protein ? food.protein: 0) + sum, 0)}</td>
                           <td className='gram text-center'>{foods.reduce((sum, food) => (food.fats ? food.fats: 0) + sum, 0)}</td>
                           <td className='gram text-center'>{foods.reduce((sum, food) => (food.carbs ? food.carbs: 0) + sum, 0)}</td>
                           <td></td>
                         </tr>}
                   </tbody>
                 </table>;
    }
}
