import * as React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import TimeInput from './TimeInput';
import Demo from '../../demo/Demo';
import Button from '../Button/Button';

import * as add from '../../resources/svg/icon-add.svg';
import * as decrease from '../../resources/svg/icon-decrease.svg';
import * as clear from '../../resources/svg/icon-small-cross.svg';
import {TTime} from './TimeInput';

const time = {
	hours: 1,
	minutes: 20
};

const log = action('change');

class TimeInputPage extends React.Component<any, any> {
	state = {
		value: time
	};

	render() {
		return (
			<Demo>
				<input type="time" id="time"/>
				<div>
					<TimeInput decrementIcon={decrease}
					           isDisabled={this.props.isDisabled}
					           incrementIcon={add}
					           error={this.props.error}
					           clearIcon={clear}
					           onValueChange={this.onTimeInputChange}
					           value={this.state.value}/>
					<Button onClick={this.onClearClick}>clear</Button>
				</div>
			</Demo>
		);
	}

	onTimeInputChange = (value: TTime) => {
		log(value);
		this.setState({
			value
		});
	}

	onClearClick = () => {
		this.setState({
			value: null
		});
	}
}

storiesOf('TimeInput', module)
	.add('default', () => <TimeInputPage/>)
	.add('disabled', () => <TimeInputPage isDisabled={true}/>)
	.add('invalid', () => <TimeInputPage error={true}/>);