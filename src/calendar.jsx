
class Calendar {
  constructor(now, updateCallback) {
	this.now = now;
	this.month = now.getMonth()+1;
	this.year = now.getFullYear();
	this.updateCallback = updateCallback;
  }
  isNow(date) {
	const sameYear = date.getFullYear() === this.now.getFullYear();
	const sameMonth = date.getMonth() === this.now.getMonth();
	const sameDay = date.getDate() === this.now.getDate();
	return sameYear && sameMonth && sameDay;
  }
  _dayOfTheYear(date) {
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = date - start;
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
  }
  _toDate(dayOfTheYear,year) {
	var date = new Date();
	date.setFullYear(year);
	date.setMonth(0);
	date.setDate(0);
	var timeOfFirst = date.getTime();
	var dayMilli = 1000 * 60 * 60 * 24;
	var dayNumMilli = dayOfTheYear * dayMilli;
	date.setTime(timeOfFirst + dayNumMilli);
	return date;
  }
  _calculateOffset(day) {
	// 0 - 6 , where 0 is sunday
	if(day == 0) { // shift sunday to last day
		return 7 - 2;
	} else {
		return day - 2;
	}
  }
  daysAroundCurrentMonth() {
    const year = this.year;
	const toDate = this._toDate;
	const offset = this._calculateOffset(new Date(year, this.month -1 , 1).getDay());
    const startDay = this._dayOfTheYear(new Date(year, this.month -1, 1)) - offset;
    return [0,1,2,3,4,5].map((r) => {
		return [0,1,2,3,4,5,6].map((d) => {
			const index = r * 7 + d;
			return toDate(startDay + index, year);
		});
	});
  }
  nextMonth() {
	if(this.month == 12) {
		this.month = 1;
		this.year = this.year + 1;
		this.updateCallback();
	} else {
		this.month = this.month + 1;
		this.updateCallback();
	}
  }
  prevMonth() {
	if(this.month == 1) {
		this.month = 12;
		this.year = this.year - 1;
		this.updateCallback();
	} else {
		this.month = this.month - 1;
		this.updateCallback();
	}
  }
  flipShowKg() {
    this.showKg = this.showKg ? false : true;
  }
  flipShowKcal() {
    this.showKcal = this.showKcal ? false : true;
  }
}

export default Calendar;