jest.disableAutomock();
import {add, subtract, format} from '../TimeInput.model';

describe('TimeInput model', () => {
	describe('add', () => {
		it('should add hours and minutes', () => {
			const a = {
				hours: 4,
				minutes: 43
			};
			const b = {
				hours: 3,
				minutes: 13
			};
			expect(add(a, b)).toEqual({
				hours: a.hours + b.hours,
				minutes: a.minutes + b.minutes
			});
		});
		it('should support overflow', () => {
			const a = {
				hours: 23,
				minutes: 59
			};
			const b = {
				hours: 2,
				minutes: 2
			};
			expect(add(a, b)).toEqual({
				hours: 1,
				minutes: 1
			});
		});
		it('should negative overflow', () => {
			const a = {
				hours: 0,
				minutes: 0
			};
			const b = {
				hours: -1,
				minutes: -1
			};
			expect(add(a, b)).toEqual({
				hours: 24 + a.hours + b.hours,
				minutes: 60 + a.minutes + b.minutes
			});
		});
	});
	describe('subtract', () => {
		it('should add hours and minutes', () => {
			const a = {
				hours: 4,
				minutes: 43
			};
			const b = {
				hours: 3,
				minutes: 13
			};
			expect(subtract(a, b)).toEqual({
				hours: a.hours - b.hours,
				minutes: a.minutes - b.minutes
			});
		});
		it('should support overflow', () => {
			const a = {
				hours: 23,
				minutes: 59
			};
			const b = {
				hours: -2,
				minutes: -2
			};
			expect(subtract(a, b)).toEqual({
				hours: 1,
				minutes: 1
			});
		});
		it('should negative overflow', () => {
			const a = {
				hours: 0,
				minutes: 0
			};
			const b = {
				hours: 1,
				minutes: 1
			};
			expect(subtract(a, b)).toEqual({
				hours: 24 + a.hours - b.hours,
				minutes: 60 + a.minutes - b.minutes
			});
		});
	});
});