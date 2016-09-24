/**
 * @param {moment.Moment} momentDate
 * @param {*} min
 * @param {*} max
 * @returns {boolean}
 */
export const isDateValid = (momentDate, min, max) => {
	return momentDate.isValid() &&
		(min ? momentDate.isSameOrAfter(min, 'day') : true) &&
		(max ? momentDate.isSameOrBefore(max, 'day') : true);
};

/**
 * @param {moment.Moment} momentDate
 * @returns {number}
 */
export const fullWeeksInMonth = momentDate => {
	const startOfMonth = momentDate.clone().startOf('month');
	const startOfFirstWeek = startOfMonth.clone().startOf('week');
	if (startOfMonth.isSame(startOfFirstWeek, 'day') && !startOfMonth.isLeapYear()) {
		// February with the beginning of the month to the first day of the first week is the only case.
		return 4;
	} else {
		return 5;
	}
};