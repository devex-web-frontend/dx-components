import React from 'react';
import moment from 'moment';
import {themr} from 'react-css-themr';
import DateInput from './Fields/DateInput';
import Popover, {ALIGN, PLACEMENT} from '../Popover/Popover';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {PURE} from 'dx-util/src/react/react';
import classnames from 'classnames';
import stateful from '../../util/react/stateful';
import Calendar, {CALENDAR_THEME} from '../Calendar/Calendar';

export const DATE_PICKER = Symbol('DATE_PICKER');

@PURE
@themr(DATE_PICKER)
class DatePicker extends React.Component {
	static propTypes = {
		value: React.PropTypes.string, // ISO - "2016-09-20T15:30:39.298Z" or NULL
		onChange: React.PropTypes.func.isRequired,
		dateFormat: React.PropTypes.string,
		headerDateFormat: React.PropTypes.string,
		min: React.PropTypes.string, // ISO
		max: React.PropTypes.string, // ISO
		openCalendarIcon: React.PropTypes.string,
		previousMonthIcon: React.PropTypes.string,
		nextMonthIcon: React.PropTypes.string,
		withField: React.PropTypes.bool,
		dateNotSelectedMsg: React.PropTypes.string,
		children: React.PropTypes.element,
		closeOnClickAway: React.PropTypes.bool,
		isDisabled: React.PropTypes.bool,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			input: React.PropTypes.string,
			input_invalid: React.PropTypes.string,
			openCalendar: React.PropTypes.string,
			openCalendar__icon: React.PropTypes.string,
			popover__container: React.PropTypes.string,
			popover__content: React.PropTypes.string
		}),
		calendarTheme: React.PropTypes.shape(CALENDAR_THEME)
	}

	static defaultProps = {
		value: moment().format(),
		dateFormat: 'DD/MM/YYYY',
		headerDateFormat: 'MMM YYYY',
		withField: true,
		closeOnClickAway: true,
		isDisabled: false,
		dateNotSelectedMsg: ''
	}

	state = {
		isOpened: false,
		isInvalid: false
	}

	_anchor;

	componentWillReceiveProps(newProps) {
		const newDate = newProps.value;
		if (newDate !== this.props.value) {
			this.setState({
				isInvalid: !this.isDateValid(moment(newDate), newProps.min, newProps.max),
				isOpened: false
			});
		}
	}

	render() {
		const {
			theme,
			calendarTheme,
			openCalendarIcon,
			closeOnClickAway,
			isDisabled,
			value,
			headerDateFormat,
			min,
			max,
			previousMonthIcon,
			nextMonthIcon
		} = this.props;

		const {isInvalid} = this.state;

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
				{this.renderField()}
				{openCalendarIcon && (
					<ButtonIcon onClick={this.onCalendarOpenClick}
								name={openCalendarIcon}
								theme={openCalendarBtnTheme}
								isDisabled={isDisabled}/>
				)}
				<Popover theme={popoverTheme}
						 isOpened={this.state.isOpened}
						 anchor={this._anchor}
						 closeOnClickAway={closeOnClickAway}
						 onRequestClose={this.onPopoverRequestClose}>
					<Calendar theme={calendarTheme}
							  value={isInvalid ? moment().format() : value}
							  onChange={this.onCalendarDateChange}
							  min={min}
							  max={max}
							  headerDateFormat={headerDateFormat}
							  previousMonthIcon={previousMonthIcon}
							  nextMonthIcon={nextMonthIcon}/>
				</Popover>
			</div>
		);
	}

	renderField() {
		const {
			value,
			theme,
			withField,
			children,
			dateFormat,
			min,
			max,
			isDisabled,
			dateNotSelectedMsg
		} = this.props;

		const {isInvalid} = this.state;
		const formattedDate = isInvalid ? dateNotSelectedMsg : moment(value).format(dateFormat);

		if (withField) {
			if (children) {
				const customField = React.Children.only(this.props.children);

				return React.cloneElement(customField, {
					...customField.props,
					value: formattedDate,
					min,
					max,
					dateFormat,
					onDateChange: this.onFieldDateChange,
					onOpenDatePicker: this.onCalendarOpenClick,
					isDisabled,
					isInvalid
				});
			} else { // default DateInput
				const inputTheme = {
					container: classnames(theme.input, {
						[theme.input_invalid]: isInvalid
					})
				};

				return (
					<DateInput value={formattedDate}
							   dateFormat={dateFormat}
							   min={min}
							   max={max}
							   onDateChange={this.onFieldDateChange}
							   onOpenDatePicker={this.onCalendarOpenClick}
							   theme={inputTheme}
							   isDisabled={isDisabled}
							   isInvalid={isInvalid}/>
				);
			}
		}

		return null;
	}

	isDateValid(momentDate, min, max) {
		return momentDate.isValid() &&
			(min ? momentDate.isSameOrAfter(min, 'day') : true) &&
			(max ? momentDate.isSameOrBefore(max, 'day') : true);
	}

	onPopoverRequestClose = () => {
		this.setState({
			isOpened: false
		});
	}

	onCalendarOpenClick = () => {
		this.setState({
			isOpened: true
		});
	}

	/**
	 * @param {String} newDateRaw
	 */
	onFieldDateChange = newDateRaw => {
		const {min, max} = this.props;

		const newDate = moment(newDateRaw, this.props.dateFormat);

		if (newDate.isSame(moment(this.props.value), 'day')) {
			this.setState({
				isOpened: false
			});
			return;
		}

		if (this.isDateValid(newDate, min, max)) {
			this.props.onChange(newDate.format());
		} else {
			this.props.onChange(null); // empty value
		}
	}

	/**
	 * @param {String} newISODate
	 */
	onCalendarDateChange = newISODate => {
		this.setState({
			isOpened: false
		});

		this.props.onChange(newISODate);
	}
}

DatePicker.Stateful = stateful()(DatePicker);

export default DatePicker;