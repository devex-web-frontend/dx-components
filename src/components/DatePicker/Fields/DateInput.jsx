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
		displayedDate: this.formatDate(this.props)
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedDate: this.formatDate(newProps)
		});
	}

	render() {
		console.log('DateField render');
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

	formatDate(props) {
		return props.value ? moment(props.value).format(props.dateFormat) : '';
	}

	onChange = e => {
		this.setState({
			displayedDate: e.target.value
		});
	}

	onBlur = e => {
		console.log('blur');
		this.props.onDateChange(e.target.value);
	}

	onKeyDown = e => {
		if (e.keyCode === 13) {
			e.target.blur();
		}
	}
}