import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import Demo from '../../demo/Demo.jsx';

import Calendar from './Calendar.jsx';
import stateful from '../../util/react/stateful';
import {storiesOf} from '@kadira/storybook';

import nextMonthIcon from '../DatePicker/resources/icon-move-right.svg';
import previousMonthIcon from '../DatePicker/resources/icon-move-left.svg';

const locale = 'en';

const headerDateFormatter = (date) => {
	return new Intl.DateTimeFormat(locale, {
		month: 'short',
		year: 'numeric'
	}).format(date);
};

const headerDayFormatter = (date) => {
	return new Intl.DateTimeFormat(locale, {
		weekday: 'short'
	}).format(date);
};

const dayFormatter = (date) => {
	return new Intl.DateTimeFormat(locale, {
		day: 'numeric'
	}).format(date);
};

const Stateful = stateful()(Calendar);

@PURE
class CalendarPage extends React.Component {

	state = {
		value: new Date(2016, 9, 16)
	}

	render() {
		return (
			<Demo>
				<section>
					<Stateful defaultValue={new Date(2016, 9, 16)}
					          min={new Date(2016, 9, 10)}
					          headerDateFormatter={headerDateFormatter}
					          headerDayFormatter={headerDayFormatter}
					          dayFormatter={dayFormatter}
					          previousMonthIcon={previousMonthIcon}
					          nextMonthIcon={nextMonthIcon}/>
				</section>
				<br/>
				<section>
					<Calendar value={this.state.value}
					          firstDayOfWeek={0}
					          onChange={this.onChnage}
					          headerDateFormatter={headerDateFormatter}
					          headerDayFormatter={headerDayFormatter}
					          previousMonthIcon={previousMonthIcon}
					          dayFormatter={dayFormatter}
					          nextMonthIcon={nextMonthIcon}/>
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