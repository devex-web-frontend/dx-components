import React from 'react';
import moment from 'moment';
import {themr} from 'react-css-themr';
import DateInput from './Fields/DateInput';
import Popover, {ALIGN, PLACEMENT} from '../Popover/Popover';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {PURE} from 'dx-util/src/react/react';
import classnames from 'classnames';
import stateful from '../../util/react/stateful';

export const DATE_PICKER = Symbol('DATE_PICKER');

@themr(DATE_PICKER)
@PURE
class DatePicker extends React.Component {
	static propTypes = {
		value: React.PropTypes.string, // ISO - "2016-09-20T15:30:39.298Z" or NULL
		onChange: React.PropTypes.func.isRequired,
		dateFormat: React.PropTypes.string,
		min: React.PropTypes.string, // ISO
		max: React.PropTypes.string, // ISO
		openCalendarIconName: React.PropTypes.string,
		withField: React.PropTypes.bool,
		children: React.PropTypes.element,
		closeOnClickAway: React.PropTypes.bool,
		isDisabled: React.PropTypes.bool,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			input__container: React.PropTypes.string,
			input__container_invalid: React.PropTypes.string,
			openCalendar__container: React.PropTypes.string,
			openCalendar__icon: React.PropTypes.string
		})
	}

	static defaultProps = {
		value: moment().format(),
		dateFormat: 'DD/MM/YYYY',
		withField: true,
		closeOnClickAway: true,
		isDisabled: false
	}

	state = {
		isOpened: false,
		isInvalid: false
	}

	_anchor;

	render() {
		console.log('DatePicker: render');
		const {
			theme,
			openCalendarIconName,
			closeOnClickAway,
			isDisabled
		} = this.props;

		const openCalendarBtnTheme = {
			container: theme.openCalendar__container,
			icon: theme.openCalendar__icon
		};

		return (
			<div className={theme.container} ref={el => this._anchor = el}>
				{this.renderField()}
				{openCalendarIconName && (
					<ButtonIcon onClick={this.onCalendarOpenClick}
								name={openCalendarIconName}
								theme={openCalendarBtnTheme}
								isDisabled={isDisabled}/>
				)}
				<Popover isOpened={this.state.isOpened}
						 anchor={this._anchor}
						 closeOnClickAway={closeOnClickAway}
						 onRequestClose={this.onPopoverRequestClose}>
					<div>1</div>
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
			isDisabled
		} = this.props;

		const {isInvalid} = this.state;

		if (withField) {
			if (children) {
				const customField = React.Children.only(this.props.children);

				return React.cloneElement(customField, {
					...customField.props,
					value,
					min,
					max,
					dateFormat,
					onDateChange: this.onDateChange,
					onOpenDatePicker: this.onCalendarOpenClick,
					isDisabled,
					isInvalid
				});
			} else { // default DateInput
				const inputTheme = {
					container: classnames(theme.input__container, {
						[theme.input__container_invalid]: isInvalid
					})
				};

				return (
					<DateInput value={value}
							   dateFormat={dateFormat}
							   min={min}
							   max={max}
							   onDateChange={this.onDateChange}
							   onOpenDatePicker={this.onCalendarOpenClick}
							   theme={inputTheme}
							   isDisabled={isDisabled}
							   isInvalid={isInvalid}/>
				);
			}
		}
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
	onDateChange = newDateRaw => {
		const {min, max} = this.props;

		const newDate = moment(newDateRaw, this.props.dateFormat);

		if (newDate.isSame(moment(this.props.value), 'day')) {
			return;
		}

		if (newDate.isValid() &&
			(min ? newDate.isSameOrAfter(min, 'day') : true) &&
			(max ? newDate.isSameOrBefore(max, 'day') : true)) {
			this.setState({
				isInvalid: false,
				isOpened: false
			});
			this.props.onChange(newDate.format());
		} else {
			this.setState({
				isInvalid: true,
				isOpened: false
			});
			this.props.onChange(null); // empty value
		}
	}
}

DatePicker.Stateful = stateful(DatePicker);

export default DatePicker;