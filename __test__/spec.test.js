import State from '../src/state.jsx'

test('january of next year after december', () => {
	const state = new State(new Date(2016,11), "en", () => {});
	state.calendar.nextMonth();
	expect(state.calendar.month).toBe(1);
	expect(state.calendar.year).toBe(2017);
});

test('december of previous year before january', () => {
	const state = new State(new Date(2016,0), "en", () => {});
	state.calendar.prevMonth();
	expect(state.calendar.month).toBe(12);
	expect(state.calendar.year).toBe(2015);
});
