import moment from 'moment';

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