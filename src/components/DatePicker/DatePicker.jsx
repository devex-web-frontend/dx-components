import React from 'react';
import moment from 'moment';
import NumericStepper from '../NumericStepper/NumericStepper';
import noop from '../../util/func/noop';

export default class DatePicker extends React.Component {
	static propTypes = {
		dateFormat: React.PropTypes.string,
		value: React.PropTypes.number,
		onChange: React.PropTypes.func,
		step: React.PropTypes.number
	}

	static defaultProps = {
		dateFormat: 'DD/MM/YYYY',
		onChange: noop,
		step: 12 * 3600 * 1000 // one day
	}

	render() {
		const {onChange, step} = this.props;

		return (
			<div>
				<NumericStepper formatter={this.dateFormatter} onChange={onChange} step={step}/>
			</div>
		);
	}

	dateFormatter = timestamp => {
		return moment(timestamp).format(this.props.dateFormat);
	}
}