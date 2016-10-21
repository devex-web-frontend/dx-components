import React from 'react';
import Day from './Day';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import {cloneDate, isEqualDate, addDays} from '../../util/func/date';

@PURE
export default class Month extends React.Component {
	static propTypes = {
		selectedDate: React.PropTypes.instanceOf(Date),
		displayedDate: React.PropTypes.instanceOf(Date),
		min: React.PropTypes.instanceOf(Date),
		max: React.PropTypes.instanceOf(Date),
		firstDayOfWeek: React.PropTypes.number,
		headerDayFormatter: React.PropTypes.func,
		dayFormatter: React.PropTypes.func,
		theme: React.PropTypes.shape(CALENDAR_THEME),
		onChange: React.PropTypes.func,
		Day: React.PropTypes.func,
	}

	static defaultProps = {
		firstDayOfWeek: 1, //Monday
		Day
	}

	renderWeek(currentDate, startOfMonth, endOfMonth, from) {
		const {theme, dayFormatter, selectedDate, onChange, min, max, Day} = this.props;
		return Array.from(new Array(7).keys()).map(i => {

			const date = addDays(from, i);
			const isSelected = isEqualDate(date, selectedDate);
			const isCurrent = isEqualDate(date, currentDate);
			let isDisabled = date.getTime() < startOfMonth.getTime() ||
				date.getTime() > endOfMonth.getTime();

			if (min && !isDisabled) {
				isDisabled = date.getTime() < min.getTime();
			}

			if (max && !isDisabled) {
				isDisabled = date.getTime() > max.getTime();
			}

			return (
				<div className={theme.dayContainer} key={i}>
					<Day value={date}
					     theme={theme}
					     dayFormatter={dayFormatter}
					     isDisabled={isDisabled}
					     isSelected={isSelected}
					     isCurrent={isCurrent}
					     onChange={onChange}/>
				</div>
			);
		});
	}

	render() {
		const {
			theme,
			displayedDate,
			firstDayOfWeek
		} = this.props;

		const currentDate = new Date();
		const startOfMonth = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 1);
		const endOfMonth = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0);

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
						<div className={theme.week} key={week}>
							{this.renderWeek(currentDate, startOfMonth, endOfMonth, weekFrom)}
						</div>
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