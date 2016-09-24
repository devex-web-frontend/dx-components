/**
 * @param {Moment} momentDate
 * @param {*} min
 * @param {*} max
 * @returns {boolean}
 */
export const isDateValid = (momentDate, min, max) => {
	return momentDate.isValid() &&
		(min ? momentDate.isSameOrAfter(min, 'day') : true) &&
		(max ? momentDate.isSameOrBefore(max, 'day') : true);
};