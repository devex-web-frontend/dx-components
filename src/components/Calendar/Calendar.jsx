import React from 'react';
import {themr} from 'react-css-themr';
import moment from 'moment';
import Month from './Month';
import Week from './Week';
import Day from './Day';
import {PURE} from 'dx-util/lib/react/react';
import CalendarHeader from './CalendarHeader';
import {CALENDAR_THEME} from './Calendar.constants';
import noop from '../../util/func/noop';
import * as PropTypes from 'prop-types';

export const CALENDAR = Symbol('Calendar');

@PURE
@themr(CALENDAR)
export default class Calendar extends React.Component {
	static propTypes = {
		value: PropTypes.string.isRequired, // ISO - "2016-09-20T15:30:39.298Z"
		headerDateFormat: PropTypes.string,
		headerDayFormat: PropTypes.string,
		dayFormat: PropTypes.string,
		onChangeDisplayed: PropTypes.func,
		onChange: PropTypes.func,
		min: PropTypes.string, // ISO
		max: PropTypes.string, // ISO
		previousMonthIcon: PropTypes.string,
		nextMonthIcon: PropTypes.string,
		locale: PropTypes.string,
		theme: PropTypes.shape(CALENDAR_THEME),
		CalendarHeader: PropTypes.func,
		Month: PropTypes.func,
		Week: PropTypes.func,
		Day: PropTypes.func,
	}

	static defaultProps = {
		CalendarHeader,
		Month,
		Week,
		Day,
		onChange: noop,
		min: null,
		max: null,
		headerDateFormat: 'MMM YYYY',
		dayFormat: 'D',
		headerDayFormat: 'ddd',
		locale: 'en'
	}

	state = {
		displayedDate: moment(this.props.value)
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedDate: moment(newProps.value)
		});
	}

	render() {
		const {
			theme,
			onChange,
			min,
			max,
			headerDateFormat,
			headerDayFormat,
			dayFormat,
			previousMonthIcon,
			nextMonthIcon,
			locale,
			value,
			CalendarHeader,
			Month,
			Week,
			Day
		} = this.props;

		const displayedDate = this.state.displayedDate.locale(locale);

		return (
			<div className={theme.container}>
				<CalendarHeader theme={theme}
				                value={displayedDate.clone()}
				                headerDateFormat={headerDateFormat}
				                previousMonthIcon={previousMonthIcon}
				                onChange={this.onChangeDisplayedDate}
				                nextMonthIcon={nextMonthIcon} />
				<Month selectedDate={moment(value).locale(locale)}
				       onChange={onChange}
				       Week={Week}
				       Day={Day}
				       startOfMonth={displayedDate.clone().startOf('month')}
				       endOfMonth={displayedDate.clone().endOf('month')}
				       currentDate={moment().locale(locale)}
				       min={moment(min).locale(locale)}
				       max={moment(max).locale(locale)}
				       theme={theme}
				       headerDayFormat={headerDayFormat}
				       dayFormat={dayFormat}/>
			</div>
		);
	}

	onChangeDisplayedDate = displayedDate => {
		const {onChangeDisplayed} = this.props;
		onChangeDisplayed && onChangeDisplayed(displayedDate);

		this.setState({
			displayedDate
		});
	}
}

