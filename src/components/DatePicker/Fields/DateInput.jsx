import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Input from '../../Input/Input';
import {PURE} from 'dx-util/src/react/react';
import {DATE_PICKER_FIELD_PROPS} from './Field.props';

@PURE
export default class DateInput extends React.Component {
	static propTypes = {
		...DATE_PICKER_FIELD_PROPS,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	}

	state = {
		displayedDate: this.props.value
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedDate: newProps.value
		});
	}

	render() {
		const {
			onOpenDatePicker,
			theme,
			isDisabled
		} = this.props;

		return (
			<Input value={this.state.displayedDate}
				   theme={theme}
				   onClick={onOpenDatePicker}
				   onChange={this.onChange}
				   onBlur={this.onBlur}
				   onKeyDown={this.onKeyDown}
				   disabled={isDisabled}/>
		);
	}

	onChange = e => {
		this.setState({
			displayedDate: e.target.value
		});
	}

	onBlur = e => {
		if (e.target.value !== this.props.value) {
			this.props.onDateChange(e.target.value);
		}
	}

	onKeyDown = e => {
		if (e.keyCode === 13) {
			e.target.blur();
		}
	}
}