import React from 'react';
import DatePicker from './DatePicker';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';

class DatePickerPage extends React.Component {
	render() {
		return (
			<Demo>
				<DatePicker />
			</Demo>
		);
	}
}

storiesOf('DatePicker', module).add('default', () => <DatePickerPage/>);