import React from 'react';
import moment from 'moment';
import {themr} from 'react-css-themr';
import DateInput from './Fields/DateInput';
import noop from '../../util/func/noop';
import Popover, {ALIGN, PLACEMENT} from '../Popover/Popover';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {PURE} from 'dx-util/src/react/react';

export const DATE_PICKER = Symbol('DATE_PICKER');

@themr(DATE_PICKER)
@PURE
export default class DatePicker extends React.Component {
	static propTypes = {
		value: React.PropTypes.string, // ISO - "2016-09-20T15:30:39.298Z"
		onChange: React.PropTypes.func,
		dateFormat: React.PropTypes.string,
		min: React.PropTypes.string, // ISO
		max: React.PropTypes.string, // ISO
		openCalendarIconName: React.PropTypes.string.isRequired,
		withField: React.PropTypes.bool,
		children: React.PropTypes.element,
		closeOnClickAway: React.PropTypes.bool,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string,
			input__container: React.PropTypes.string,
			openCalendar__container: React.PropTypes.string,
			openCalendar__icon: React.PropTypes.string
		})
	}

	static defaultProps = {
		value: moment().format(),
		onChange: noop,
		dateFormat: 'DD/MM/YYYY',
		withField: true,
		closeOnClickAway: true
	}

	state = {
		isOpened: false
	}

	_anchor;

	render() {
		const {
			value,
			theme,
			withField,
			children,
			dateFormat,
			min,
			max,
			openCalendarIconName,
			closeOnClickAway
		} = this.props;

		const openCalendarBtnTheme = {
			container: theme.openCalendar__container,
			icon: theme.openCalendar__icon
		};

		return (
			<div className={theme.container} ref={el => this._anchor = el}>
				{this.renderField()}
				<ButtonIcon onClick={this.onCalendarOpenClick}
							name={openCalendarIconName}
							theme={openCalendarBtnTheme}/>
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
			max
		} = this.props;

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
					onClick: this.onCalendarOpenClick
				});
			} else { // default DateInput
				const inputTheme = {
					container: theme.input__container
				};

				return (
					<DateInput value={value}
							   dateFormat={dateFormat}
							   min={min}
							   max={max}
							   onDateChange={this.onDateChange}
							   onClick={this.onCalendarOpenClick}
							   theme={inputTheme}/>
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
	 * @param {String} newDateISO
	 */
	onDateChange = newDateISO => {
		this.props.onChange(newDateISO);
	}
}