import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../../Input/Input';
import {PURE} from 'dx-util/src/react/react';
import {DATE_PICKER_FIELD_PROPS} from './field.props';

const KEY_ENTER = 13;

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
			onClick
		} = this.props;

		return (
			<Input ref={e => this._input = ReactDOM.findDOMNode(e)}
				   value={this.state.displayedDate}
				   theme={theme}
				   onClick={onClick}
				   onChange={this.onInputChange}
				   onBlur={this.onInputBlur}
				   onKeyPress={this.onInputKeyPress}
				   disabled={isDisabled}/>
		);
	}

	formatDateForView(props) {
		const {dateFormatter} = props;
		const {value} = props;
		return dateFormatter ? dateFormatter(value) : value;
	}

	setNewValue(value) {
		const {onChange} = this.props;
		onChange && onChange(value);
	}

	onInputChange = ({target: {value}}) => {
		this.setState({
			displayedDate: value
		});
	}

	onInputBlur = ({target: {value}}) => {
		this.setNewValue(value);
	}

	onInputKeyPress = e => {
		switch (e.keyCode || e.which) {
			case KEY_ENTER: {
				this.setNewValue(e.target.value);
				break;
			}
		}
	}
}