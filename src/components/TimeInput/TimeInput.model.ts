export type TTime = {
	hours: number,
	minutes: number
};

export const add = (a: TTime, b: TTime): TTime => {
	let hours = (a.hours + b.hours) % 24;
	let minutes = (a.minutes + b.minutes) % 60;

	if (hours < 0) {
		hours += 24;
	}

	if (minutes < 0) {
		minutes += 60;
	}

	return {
		hours,
		minutes
	};
};

export const subtract = (a: TTime, b: TTime): TTime => {
	return add(a, {
		hours: -b.hours,
		minutes: -b.minutes
	});
};