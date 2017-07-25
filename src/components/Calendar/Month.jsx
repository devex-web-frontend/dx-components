import React from 'react';
import moment from 'moment';
import {PURE} from 'dx-util/lib/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import Week from './Week';
import noop from '../../util/func/noop';

@PURE
export default class Month extends React.Component {
	static propTypes = {
		selectedDate: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func,
		min: React.PropTypes.instanceOf(moment).isRequired,
		max: React.PropTypes.instanceOf(moment).isRequired,
		startOfMonth: React.PropTypes.instanceOf(moment).isRequired,
		endOfMonth: React.PropTypes.instanceOf(moment).isRequired,
		currentDate: React.PropTypes.instanceOf(moment).isRequired,
		headerDayFormat: React.PropTypes.string.isRequired,
		dayFormat: React.PropTypes.string.isRequired,
		theme: React.PropTypes.shape(CALENDAR_THEME),
		Week: React.PropTypes.func,
		Day: React.PropTypes.func,
	}

	static defaultProps = {
		onChange: noop
	}

	render() {
		const {
			selectedDate,
			theme,
			dayFormat,
			onChange,
			min,
			max,
			startOfMonth,
			endOfMonth,
			currentDate,
			Week,
			Day,
		} = this.props;

		const from = startOfMonth.clone().startOf('week');

		return (
			<div className={theme.month}>
				{this.renderDaysHeader(from.clone())}
				{Array.from(new Array(6).keys()).map(week => (
					<Week selectedDate={selectedDate.clone()}
						  onChange={onChange}
						  key={week}
						  Day={Day}
						  from={from.clone().add(week, 'weeks')}
						  dayFormat={dayFormat}
						  theme={theme}
						  min={min}
						  max={max}
						  startOfMonth={startOfMonth}
						  endOfMonth={endOfMonth}
						  currentDate={currentDate}/>
				))}
			</div>
		);
	}

	/**
	 * @param {moment.Moment} startDate
	 * @returns {*}
	 */
	renderDaysHeader(startDate) {
		const {theme, headerDayFormat} = this.props;
		return (
			<div className={theme.monthHeader}>
				{Array.from(new Array(7).keys()).map(i => (
					<div className={theme.monthHeader__day}
						 key={i}>
						{startDate.clone().add(i, 'days').format(headerDayFormat)}
					</div>
				))}
			</div>
		);
	}
}