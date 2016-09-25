
const calendarHandler = (state) => {
    const now = state.unsaved.get('now');
    const year = state.unsaved.get('year');
    const month = state.unsaved.get('month');
    const _toDate = (dayOfTheYear,year) => {
      const date = new Date();
      date.setFullYear(year);
      date.setMonth(0);
      date.setDate(0);
      const timeOfFirst = date.getTime();
      const dayMilli = 1000 * 60 * 60 * 24;
      const dayNumMilli = dayOfTheYear * dayMilli;
      date.setTime(timeOfFirst + dayNumMilli);
      return date;
    };
    const _dayOfTheYear = (date) => {
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = date - start;
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    };
    const _calculateOffset = (day) => {
        // 0 - 6 , where 0 is sunday
        if(day == 0) { // shift sunday to last day
            return 7 - 2;
        } else {
            return day - 2;
        }
    };
    return {
        now: () => now,
        month: () => month,
        year: () => year,
        showKg: state.saved.get('showKg'),
        showKcal: state.saved.get('showKcal'),
        isNow: (date) => {
            const sameYear = date.getFullYear() === now.getFullYear();
            const sameMonth = date.getMonth() === now.getMonth();
            const sameDay = date.getDate() === now.getDate();
            return sameYear && sameMonth && sameDay;
        },
        daysAroundCurrentMonth: () => {
            const offset = _calculateOffset(new Date(year, month -1 , 1).getDay());
            const startDay = _dayOfTheYear(new Date(year, month -1, 1)) - offset;
            return [0,1,2,3,4,5].map((r) => {
                return [0,1,2,3,4,5,6].map((d) => {
                    const index = r * 7 + d;
                    return _toDate(startDay + index, year);
                });
            });
        },
        nextMonth: () => {
            if(month == 12) {
                return {unsaved: state.unsaved.set('year', year + 1).set('month', 1)};
            } else {
                return {unsaved: state.unsaved.set('month', month + 1)};
            }
        },
        prevMonth: () => {
            if(month == 1) {
                return {unsaved: state.unsaved.set('year', year - 1).set('month', 12)};
            } else {
                return {unsaved: state.unsaved.set('month', month - 1)};
            }
        },
        flipShowKg: () => {
            const showKg = state.saved.get('showKg');
            return {saved: state.saved.set('showKg', showKg ? false: true)};
        },
        flipShowKcal: () => {
            const showKcal = state.saved.get('showKcal');
            return {saved: state.saved.set('showKcal', showKcal ? false: true)};
        },
        selectDay: (day) => {
            return {unsaved: state.unsaved.set('selectedDay', day)};
        },
        selectedDay: () => state.unsaved.get('selectedDay')
    }
};

export default calendarHandler;