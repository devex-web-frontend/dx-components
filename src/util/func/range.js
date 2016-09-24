/**
 * @param {number} from
 * @param {number} to
 * @returns {Array}
 */
export default (from, to) => {
	const range = [];
	if (from >= to) {
		return range;
	}

	for (let i = from; i < to; i++) {
		range.push(i);
	}
	return range;
};