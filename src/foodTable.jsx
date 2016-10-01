import React from 'react';
import localeHandler from './translations.jsx';

class FoodTable extends React.Component {
  render() {
    const state = this.props.state;
    const foods = state.saved.get('foods');
    const locale = localeHandler(state);
    return <table className="table table-borderless table-hover">
        <thead>
            <tr>
                <th>{locale("food.table.name")}</th>
                <th>{locale("food.table.serving")}</th>
                <th>{locale("food.table.protein")}</th>
                <th>{locale("food.table.fats")}</th>
                <th>{locale("food.table.carbs")}</th>
            </tr>
        </thead>
        <tbody>
            {foods.map((food, i) => {
                return <tr key={i}>
                   <td>{food.n}</td>
                   <td>{food.s}</td>
                   <td>{food.p}</td>
                   <td>{food.f}</td>
                   <td>{food.c}</td>
                </tr>;
            })}
        </tbody>
    </table>;
  }
}

export default FoodTable;