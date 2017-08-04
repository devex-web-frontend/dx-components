import React from 'react';
import moment from 'moment';
import { themr } from 'react-css-themr';
import DateInput from './fields/DateInput';
import { Popover, ALIGN, PLACEMENT } from '../Popover/Popover.tsx';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { PURE } from 'dx-util/lib/react/react';
import stateful from '../../util/react/stateful';
import Calendar, { CALENDAR_THEME } from '../Calendar/Calendar';
import { isDateValid } from '../../util/func/date';
import noop from '../../util/func/noop';
import * as PropTypes from 'prop-types';

export const DATE_PICKER = Symbol('DATE_PICKER');

@PURE
@themr(DATE_PICKER)
class DatePicker extends React.Component {
	static propTypes = {
		value: PropTypes.string, // ISO - "2016-09-20T15:30:39.298Z" or NULL
		onChange: PropTypes.func,
		fieldDateFormat: PropTypes.string, // field
		headerDateFormat: PropTypes.string,
		headerDayFormat: PropTypes.string,
		dayFormat: PropTypes.string,
		min: PropTypes.string, // ISO
		max: PropTypes.string, // ISO
		openCalendarIcon: PropTypes.string,
		previousMonthIcon: PropTypes.string.isRequired,
		nextMonthIcon: PropTypes.string.isRequired,
		withField: PropTypes.bool,
		fieldComponent: PropTypes.func,
		placeholder: PropTypes.string,
		isDisabled: PropTypes.bool,
		locale: PropTypes.string,
		theme: PropTypes.shape({
			container: PropTypes.string,
			field: PropTypes.string,
			field_invalid: PropTypes.string,
			openCalendar: PropTypes.string,
			openCalendar__icon: PropTypes.string,
			popover__container: PropTypes.string,
			popover__content: PropTypes.string
		}),
		calendarTheme: PropTypes.shape(CALENDAR_THEME)
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
		fieldComponent: DateInput,
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
			fieldComponent: Field,
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
					<Field value={moment(value).locale(locale)}
					       dateFormat={fieldDateFormat}
					       min={moment(min).locale(locale)}
					       max={moment(max).locale(locale)}
					       onChange={this.onFieldDateChange}
					       openDatePicker={this.openDatePicker}
					       closeDatePicker={this.closeDatePicker}
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
		const { min, max } = this.props;

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