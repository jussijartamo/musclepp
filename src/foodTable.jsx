import React from 'react';
import localeHandler from './translations.jsx';

class FoodTable extends React.Component {
  render() {
    const state = this.props.state;
    const foods = state.saved.get('foods')
    return <table className="table table-borderless table-hover">
        <thead>
            <tr>
                <th>name</th>
                <th>serving</th>
                <th>protein</th>
                <th>fats</th>
                <th>carbs</th>
            </tr>
        </thead>
        <tbody>
            {foods.map((food) => {
                return <tr>
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