import React from 'react';
import Day from './Day';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import Week from './Week';
import {cloneDate} from '../../util/func/date';

@PURE
export default class Month extends React.Component {
	static propTypes = {
		selectedDate: React.PropTypes.instanceOf(Date),
		value: React.PropTypes.instanceOf(Date),
		min: React.PropTypes.instanceOf(Date),
		max: React.PropTypes.instanceOf(Date),
		firstDayOfWeek: React.PropTypes.number,
		headerDayFormatter: React.PropTypes.func,
		dayFormatter: React.PropTypes.func,
		theme: React.PropTypes.shape(CALENDAR_THEME),
		onChange: React.PropTypes.func,
		Week: React.PropTypes.func,
		Day: React.PropTypes.func,
	}

	static defaultProps = {
		firstDayOfWeek: 1, //Monday
		Day,
		Week
	}

	render() {
		const {
			selectedDate,
			theme,
			value,
			dayFormatter,
			onChange,
			min,
			max,
			firstDayOfWeek
		} = this.props;

		const currentDate = new Date();
		const startOfMonth = new Date(value.getFullYear(), value.getMonth(), 1);
		const endOfMonth = new Date(value.getFullYear(), value.getMonth() + 1, 0);

		const from = cloneDate(startOfMonth);
		while (from.getDay() > 0) {
			from.setDate(from.getDate() - 1);
		}
		if (firstDayOfWeek !== 0) {
			from.setDate(from.getDate() + firstDayOfWeek);
		}

		return (
			<div className={theme.month}>
				{this.renderDaysHeader(startOfMonth)}

				{Array.from(new Array(6).keys()).map(week => {

					const weekFrom = cloneDate(from);
					weekFrom.setDate(weekFrom.getDate() + 7 * week);

					return (
						<Week selectedDate={selectedDate}
						      onChange={onChange}
						      key={week}
						      from={weekFrom}
						      theme={theme}
						      dayFormatter={dayFormatter}
						      min={min}
						      max={max}
						      startOfMonth={startOfMonth}
						      endOfMonth={endOfMonth}
						      currentDate={currentDate} />
					);
				})}
			</div>
		);
	}

	_localizedWeekday(day, firstDayOfWeek) {
		const {headerDayFormatter} = this.props;

		//first day week
		const now = new Date();
		const date = new Date(now.setDate(now.getDate() - now.getDay()));
		date.setDate(date.getDate() + (day + firstDayOfWeek));

		return headerDayFormatter ? headerDayFormatter(date) : date;
	}

	renderDaysHeader() {
		const {theme, firstDayOfWeek} = this.props;
		return (
			<div className={theme.monthHeader}>
				{Array.from(new Array(7).keys()).map(i => {
					return (
						<div className={theme.monthHeader__day} key={i}>
							{this._localizedWeekday(i, firstDayOfWeek)}
						</div>
					);
				})}
			</div>
		);
	}
}