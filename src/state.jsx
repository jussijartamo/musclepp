import Calendar from './calendar.jsx';
import translations from './translations.jsx';

class State {
  constructor(now, lang, updateCallback) {
	this.calendar = new Calendar(now, () => updateCallback(this));
	this.lang = lang;
	this.updateCallback = updateCallback;
  }
  locale(key) {
	return translations[key][this.lang];
  }
}

export default State;