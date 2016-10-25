import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Input from '../../Input/Input';
import {PURE} from 'dx-util/src/react/react';
import {DATE_PICKER_FIELD_PROPS} from './field.props';
import classnames from 'classnames';

@PURE
export default class DateInput extends React.Component {
	static propTypes = {
		...DATE_PICKER_FIELD_PROPS
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
			onClick,
			isInvalid
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
				   onClick={onClick}
				   onChange={this.onChange}
				   onBlur={this.onBlur}
				   onKeyDown={this.onKeyDown}
				   disabled={isDisabled}/>
		);
	}

	formatDateForView(props) {
		const {dateFormatter} = this.props;
		const {value} = props;
		return dateFormatter ? dateFormatter(value) : value;
	}

	setNewValue(inputString) {
		const {dateFormat, locale, value} = this.props;
		if (inputString !== value.format(dateFormat)) { // if changed
			const inputDate = moment(inputString, dateFormat, locale);
			this.props.onChange(inputDate);
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