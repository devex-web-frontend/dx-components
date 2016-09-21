import React from 'react';
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

	static defaultProps = {}

	state = {
		displayedDate: this.dateFormat(this.props)
	}

	componentWillReceiveProps(newProps) {
		if (newProps.value !== this.props.value) {
			this.setState({
				displayedDate: this.dateFormat(newProps)
			});
		}
	}

	render() {
		const {
			onClick,
			theme
		} = this.props;

		return (
			<Input value={this.state.displayedDate}
				   theme={theme}
				   onClick={onClick}
				   onChange={this.onChange}
				   onBlur={this.onBlur}/>
		);
	}

	dateFormat(props) {
		return moment(props.value).format(props.dateFormat);
	}

	onChange = e => {
		this.setState({
			displayedDate: e.target.value
		});
	}

	onBlur = e => {
		const newDate = moment(e.target.value, this.props.dateFormat);
		if (newDate.isValid()) {
			this.props.onDateChange(newDate.format());
		} else {
			this.setState({
				displayedDate: this.dateFormat(this.props)
			});
		}
	}
}