import { fromJS, Record, Map, List } from 'immutable';
import { State, Day, Food } from './interfaces';
import * as moment from 'moment';

export class AppState implements State {

    private saved : Map<string,any>;
    private unsaved : Map<string,any>;

    constructor(saved: {[key:string]:any}, unsaved: {[key:string]:any}) {
        this.saved = fromJS(saved);
        this.unsaved = fromJS(unsaved);
    }
    getSavedState(): any {
        return this.saved.toJS();
    }
    clone(s:Map<string,any>,u:Map<string,any>) {
        return new AppState(s.toJS(),u.toJS());
    }
    asDate(day: Day) {
        return new Date(day.getYear(), day.getMonthIndex(), day.getDate());
    }
    getFoods(day: Day): Array<Food> {
        const foods = this.saved.getIn(['foods',day.toString()]);
        return foods == null ? [] : foods.toJS();
    }
    getCalories(day: Day): number {
        return this.getFoods(day).reduce((sum, food) => (food.calories ? food.calories: 0) + sum, 0);
    }
    setLang(lang: string): State {
        return this.clone(this.saved.set('lang', lang), this.unsaved);
    }
    addFood(day: Day, food: Food): State {
        const path = ['foods', day.toString()];
        const saved = this.saved.updateIn(path, (list) => list ? list.push(food) : List.of(food) );
        return this.clone(saved, this.unsaved);
    }
    setFood(day: Day, food: Food, index: number): State {
        const path = ['foods', day.toString()];
        const saved = this.saved.updateIn(path, (list) => list ? list.setIn([index],food) : List.of(food) );
        return this.clone(saved, this.unsaved);
    }
    removeFood(day: Day, index: number): State {
        const path = ['foods', day.toString()];
        const saved = this.saved.updateIn(path, (list) => list ? list.splice(index,1) : List.of() );
        return this.clone(saved, this.unsaved);
    }
    getLang() {
        return this.saved.get('lang');
    }
    asDay(date, selected): Day {
        const day = date.day();
        return {
            getWeekDayIndex: () => (day == 0 ? 6 : (day - 1)),
            getMonthIndex: () => date.month(),
            getDate: () => date.date(),
            getYear: () => date.year(),
            isSelected: () => selected,
            toString: () => date.format('DD-MM-YYYY')
        };
    }
    getSelectedDay(): Day {
        return this.asDay(moment(this.unsaved.get('selected')), true);
    }
    setSelectedDay(day: Day) {
        return this.clone(this.saved, this.unsaved.set('selected', this.asDate(day)));
    }
    getWeek(): Array<Day> {
        const focus = this.unsaved.get('selected');
        return [
            this.asDay(moment(focus).subtract(3, 'days'), false),
            this.asDay(moment(focus).subtract(2, 'days'), false),
            this.asDay(moment(focus).subtract(1, 'days'), false),
            this.asDay(moment(focus), true),
            this.asDay(moment(focus).add(1, 'days'), false),
            this.asDay(moment(focus).add(2, 'days'), false),
            this.asDay(moment(focus).add(3, 'days'), false)
            ];
    }
}



