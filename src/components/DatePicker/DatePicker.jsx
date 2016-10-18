import React from 'react';
import moment from 'moment';
import {themr} from 'react-css-themr';
import DateInput from './fields/DateInput';
import Popover, {ALIGN, PLACEMENT} from '../Popover/Popover';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {PURE} from 'dx-util/src/react/react';
import stateful from '../../util/react/stateful';
import Calendar, {CALENDAR_THEME} from '../Calendar/Calendar';
import {isDateValid} from '../../util/func/date';
import noop from '../../util/func/noop';

export const DATE_PICKER = Symbol('DATE_PICKER');

@PURE
@themr(DATE_PICKER)
class DatePicker extends React.Component {
	static propTypes = {
		value: React.PropTypes.string, // ISO - "2016-09-20T15:30:39.298Z" or NULL
		onChange: React.PropTypes.func,
		fieldDateFormat: React.PropTypes.string, // field
		headerDateFormat: React.PropTypes.string,
		headerDayFormat: React.PropTypes.string,
		dayFormat: React.PropTypes.string,
		min: React.PropTypes.string, // ISO
		max: React.PropTypes.string, // ISO
		openCalendarIcon: React.PropTypes.string,
		previousMonthIcon: React.PropTypes.string.isRequired,
		nextMonthIcon: React.PropTypes.string.isRequired,
		withField: React.PropTypes.bool,
		placeholder: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		locale: React.PropTypes.string,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			field: React.PropTypes.string,
			field_invalid: React.PropTypes.string,
			openCalendar: React.PropTypes.string,
			openCalendar__icon: React.PropTypes.string,
			popover__container: React.PropTypes.string,
			popover__content: React.PropTypes.string
		}),
		Input: React.PropTypes.func,
		calendarTheme: React.PropTypes.shape(CALENDAR_THEME)
	}

	static defaultProps = {
		value: moment().format(),
		onChange: noop,
		min: null, // for date validation: moment(undefined) == current date, moment(null) is invalid
		max: null,
		fieldDateFormat: 'MM/DD/YYYY',
		headerDateFormat: 'MMM YYYY',
		dayFormat: 'D',
		headerDayFormat: 'ddd',
		locale: 'en',
		withField: true,
		Input: DateInput,
		isDisabled: false,
		placeholder: ''
	}

	state = {
		isOpened: false
	};

	_anchor;

	render() {
		const {
			theme,
			calendarTheme,
			openCalendarIcon,
			isDisabled,
			fieldDateFormat,
			headerDateFormat,
			headerDayFormat,
			dayFormat,
			placeholder,
			value,
			min,
			max,
			Input,
			previousMonthIcon,
			nextMonthIcon,
			locale,
			withField
		} = this.props;

		const isInvalid = !isDateValid(moment(this.props.value), this.props.min, this.props.max);

		const openCalendarBtnTheme = {
			container: theme.openCalendar,
			icon: theme.openCalendar__icon
		};
		const popoverTheme = {
			container: theme.popover__container,
			content: theme.popover__content
		};

		return (
			<div className={theme.container} ref={el => this._anchor = el}>
				{withField && (
					<Input value={moment(value).locale(locale)}
						   dateFormat={fieldDateFormat}
						   min={moment(min).locale(locale)}
						   max={moment(max).locale(locale)}
						   onClick={this.onFieldClick}
						   onChange={this.onFieldDateChange}
						   theme={theme}
						   isDisabled={isDisabled}
						   isInvalid={isInvalid}
						   locale={locale}
						   placeholder={placeholder}
						   isDatePickerOpened={this.state.isOpened}/>
				)}
				{openCalendarIcon && (
					<ButtonIcon onClick={this.onIconClick}
								name={openCalendarIcon}
								theme={openCalendarBtnTheme}
								isDisabled={isDisabled}/>
				)}
				<Popover theme={popoverTheme}
						 isOpened={this.state.isOpened}
						 anchor={this._anchor}
						 closeOnClickAway={true}
						 onRequestClose={this.onPopoverRequestClose}>
					<Calendar theme={calendarTheme}
							  value={isInvalid ? moment().format() : value}
							  onChange={this.onCalendarDateChange}
							  min={min}
							  max={max}
							  headerDateFormat={headerDateFormat}
							  dayFormat={dayFormat}
							  headerDayFormat={headerDayFormat}
							  previousMonthIcon={previousMonthIcon}
							  nextMonthIcon={nextMonthIcon}
							  locale={locale}/>
				</Popover>
			</div>
		);
	}

	onFieldClick = () => {
		const {isOpened} = this.state;
		this.setState({
			isOpened: !isOpened
		});
	}

	openDatePicker = () => {
		this.setState({
			isOpened: true
		});
	}

	closeDatePicker = () => {
		this.setState({
			isOpened: false
		});
	}

	/**
	 * @param {moment.Moment} newDate
	 */
	onFieldDateChange = newDate => {
		const {min, max} = this.props;

		if (isDateValid(newDate, min, max)) {
			this.setState({
				isOpened: false
			});
			this.props.onChange(newDate.format());
		} else {
			this.setState({
				isOpened: false
			});
			this.props.onChange(null); // empty value
		}
	}

	/**
	 * @param {string} dateISO
	 */
	onCalendarDateChange = dateISO => {
		this.setState({
			isOpened: false
		});

		this.props.onChange(dateISO);
	}

	onPopoverRequestClose = () => this.closeDatePicker();
	onIconClick = () => this.openDatePicker();
}

DatePicker.Stateful = stateful()(DatePicker);

export default DatePicker;