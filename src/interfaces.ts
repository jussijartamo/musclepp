import { Record, Map } from 'immutable';

export interface LocalStorage {
    getItem: (string) => {[key:string]:any};
    setItem: (string, any) => void;
}

export interface Day {
    getWeekDayIndex: () => number; // 0-6
    getMonthIndex: () => number; // 0-11
    getDate: () => number;
    getYear: () => number;
    isSelected: () => boolean;
    toString: () => string;
}
export interface Food {
    name: string;
    carbs: number;
    fats: number;
    protein: number;
    serving: number;
    calories: number;
}
export interface Controller {
    text: (string) => any;
    update: (State) => void;
    getState: () => State;
}
export interface State {
    getSavedState: () => any;
    setLang: (string) => State;
    getLang: () => string;
    getWeek: () => Array<Day>;
    getSelectedDay: () => Day;
    setSelectedDay: (Day) => void;
    getFoods: (Day) => Array<Food>;
    addFood: (Day, Food) => State;
    setFood: (Day, Food, number) => State;
    removeFood: (Day, number) => State;
    getCalories: (Day) => number;
}

