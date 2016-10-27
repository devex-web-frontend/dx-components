import React from 'react';
import {themr} from 'react-css-themr';
import moment from 'moment';
import Month from './Month';
import {PURE} from 'dx-util/src/react/react';
import CalendarHeader from './CalendarHeader';
import {CALENDAR_THEME} from './Calendar.constants';
import noop from '../../util/func/noop';

export const CALENDAR = Symbol('Calendar');

@PURE
@themr(CALENDAR)
export default class Calendar extends React.Component {
	static propTypes = {
		value: React.PropTypes.string.isRequired, // ISO - "2016-09-20T15:30:39.298Z"
		headerDateFormat: React.PropTypes.string,
		headerDayFormat: React.PropTypes.string,
		dayFormat: React.PropTypes.string,
		CalendarHeader: React.PropTypes.func,
		onChange: React.PropTypes.func,
		min: React.PropTypes.string, // ISO
		max: React.PropTypes.string, // ISO
		previousMonthIcon: React.PropTypes.string,
		nextMonthIcon: React.PropTypes.string,
		locale: React.PropTypes.string,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	static defaultProps = {
		CalendarHeader,
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
			CalendarHeader
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
		this.setState({
			displayedDate
		});
	}
}

