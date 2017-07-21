import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Input from '../../Input/Input';
import {PURE} from 'dx-util/lib/react/react';
import {DATE_PICKER_FIELD_PROPS} from './field.props';
import classnames from 'classnames';

@PURE
export default class DateInput extends React.Component {
	static propTypes = {
		...DATE_PICKER_FIELD_PROPS
	}

	static defaultProps = {
		Input
	}

	state = {
		displayedDate: this.formatDateForView(this.props)
	}

	_input;

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedDate: this.formatDateForView(newProps)
		});
	}

	render() {
		const {
			theme,
			isDisabled,
			isInvalid,
			Input
		} = this.props;

		const inputTheme = {
			container: classnames(theme.field, {
				[theme.field_invalid]: isInvalid
			})
		};

		return (
			<Input ref={e => this._input = ReactDOM.findDOMNode(e)}
				   value={this.state.displayedDate}
				   theme={inputTheme}
				   onClick={this.onClick}
				   onChange={this.onChange}
				   onBlur={this.onBlur}
				   onKeyDown={this.onKeyDown}
				   disabled={isDisabled}/>
		);
	}

	formatDateForView(props) {
		return props.isInvalid ? props.placeholder : props.value.format(props.dateFormat);
	}

	setNewValue(inputString) {
		const {dateFormat, locale, value} = this.props;
		if (inputString !== value.format(dateFormat)) { // if changed
			const inputDate = moment(inputString, dateFormat, locale);
			this.props.onChange(inputDate);
		}
	}

	onClick = e => {
		const {isDatePickerOpened} = this.props;
		if (!isDatePickerOpened) {
			this.props.openDatePicker();
		}
	}

	onChange = e => {
		this.setState({
			displayedDate: e.target.value
		});
	}

	onBlur = e => {
		this.setNewValue(e.target.value);
	}

	onKeyDown = e => {
		if (e.keyCode === 13) {
			this.setNewValue(e.target.value);
			this.props.closeDatePicker();
		}
	}
}