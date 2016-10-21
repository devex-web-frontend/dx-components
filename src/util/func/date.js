import moment from 'moment';

/**
 * Clone date
 * @param {Date} date
 * @returns {Date}
 */
export const cloneDate = (date) => new Date(date.getTime());

/**
 * Add day`s to date
 * @param {Date} date
 * @param {Number} amountDay
 * @returns {Date}
 */
export const addDays = (date, amountDay) => {
	const newDate = cloneDate(date);
	newDate.setDate(date.getDate() + amountDay);
	return newDate;
};

/**
 * Add month`s to date
 * @param {Date} date
 * @param {Number} amountMonth
 * @returns {Date}
 */
export const addMonths = (date, amountMonth) => {
	const newDate = cloneDate(date);
	newDate.setMonth(date.getMonth() + amountMonth);
	return newDate;
};

/**
 * Compare date
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export const isEqualDate = (date1, date2) => {
	return date1 && date2 &&
		(date1.getFullYear() === date2.getFullYear()) &&
		(date1.getMonth() === date2.getMonth()) &&
		(date1.getDate() === date2.getDate());
};


/**
 * @param {moment.Moment} momentDate
 * @param {*} min
 * @param {*} max
 * @returns {boolean}
 */
export const isDateValid = (momentDate, min = null, max = null) => {
	// set `min` and `max` to null by default because of `moment(undefined).isValid() === true`
	const minBound = moment.isMoment(min) ? min : moment(min);
	const maxBound = moment.isMoment(max) ? max : moment(max);

	return momentDate.isValid() &&
		(minBound.isValid() ? momentDate.isSameOrAfter(minBound, 'day') : true) &&
		(maxBound.isValid() ? momentDate.isSameOrBefore(maxBound, 'day') : true);
};

/**
 * @param {moment.Moment} momentDate
 * @returns {number}
 */
export const fullWeeksInMonth = momentDate => {
	const startOfFirstWeek = momentDate.clone().startOf('month').startOf('week');
	const endOfLastWeek = momentDate.clone().endOf('month').endOf('week');
	return Math.ceil(endOfLastWeek.diff(startOfFirstWeek, 'days') / 7);
};