import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import Demo from '../../demo/Demo.jsx';
import {FORMATTER} from '../DatePicker/DatePicker.page';
import Calendar from './Calendar.jsx';
import {storiesOf} from '@kadira/storybook';

import nextMonthIcon from '../DatePicker/resources/icon-move-right.svg';
import previousMonthIcon from '../DatePicker/resources/icon-move-left.svg';

@PURE
class CalendarPage extends React.Component {

	state = {
		value: new Date().toISOString()
	}

	render() {
		const {value} = this.state;
		return (
			<Demo>
				<section>
					<Calendar value={value}
					          previousMonthIcon={previousMonthIcon}
					          onChange={this.onChnage}
					          nextMonthIcon={nextMonthIcon} />
				</section>
			</Demo>
		);
	}

	onChnage = value => {
		this.setState({
			value
		});
	}
}

storiesOf('Calendar', module).add('Default', () => <CalendarPage />);