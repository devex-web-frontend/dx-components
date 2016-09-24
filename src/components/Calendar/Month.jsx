import React from 'react';
import moment from 'moment';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import Week from './Week';
import range from '../../util/func/range';

@PURE
export default class Month extends React.Component {
	static propTypes = {
		date: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func,
		min: React.PropTypes.string,
		max: React.PropTypes.string,
		headerDayFormat: React.PropTypes.string.isRequired,
		dayFormat: React.PropTypes.string.isRequired,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	render() {
		const {
			date,
			theme,
			dayFormat,
		} = this.props;

		const from = date.startOf('month').startOf('week');

		// Hard-code 5 weeks even for February for consistency
		return (
			<div className={theme.month}>
				{this.renderDaysHeader(from.clone())}
				{range(0, 5).map(week => (
					<Week key={week}
						  from={from.clone().add(week, 'weeks')}
						  dayFormat={dayFormat}
						  theme={theme}/>
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
				{range(0, 7).map(i => (
					<div className={theme.monthHeader__day}
						 key={i}>
						{startDate.clone().add(i, 'days').format(headerDayFormat)}
					</div>
				))}
			</div>
		);
	}
}