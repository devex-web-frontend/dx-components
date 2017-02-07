jest.disableAutomock();
import {add} from '../DateInput.utils';

describe('add', () => {
	it('should take `max - b` or `b` if `a` is not defined', () => {
		const a = undefined;
		const max = 31;
		expect(add(a, 1, max)).toBe(1);
		expect(add(a, -1, max)).toBe(max);
		expect(add(a, 2, max)).toBe(2);
		expect(add(a, -2, max)).toBe(max - 1);
	});
	it('should accept `a` as zero and return same as for `undefined`', () => {
		const a = 0;
		const max = 31;
		expect(add(a, 1, max)).toBe(1);
		expect(add(a, -1, max)).toBe(max);
		expect(add(a, 2, max)).toBe(2);
		expect(add(a, -2, max)).toBe(max - 1);
	});
	it('should add and overflow positively', () => {
		expect(add(0, 3, 3)).toBe(3);
		expect(add(1, 3, 3)).toBe(0);
		expect(add(2, 3, 3)).toBe(1);
		expect(add(3, 3, 3)).toBe(2);
		expect(add(4, 3, 3)).toBe(3);
		expect(add(5, 3, 3)).toBe(0);
	});
	it('should add and overflow negatively', () => {
		expect(add(0, -3, 3)).toBe(1);
		expect(add(1, -3, 3)).toBe(2);
		expect(add(2, -3, 3)).toBe(3);
		expect(add(3, -3, 3)).toBe(0);
		expect(add(4, -3, 3)).toBe(1);
		expect(add(5, -3, 3)).toBe(2);
	});
});