import React from 'react';
import {PURE} from 'dx-util/src/react/pure';
import Demo from '../../demo/Demo.jsx';
import {FORMATTER} from '../DatePicker/DatePicker.page';
import Day from './Day.jsx';
import Calendar from './Calendar.jsx';
import stateful from '../../util/react/stateful';
import {storiesOf} from '@kadira/storybook';

import nextMonthIcon from '../DatePicker/resources/icon-move-right.svg';
import previousMonthIcon from '../DatePicker/resources/icon-move-left.svg';
import css from './Calendar.page.styl';

const formatter = FORMATTER.INTL;

const headerDateFormatter = formatter.headerDate;
const headerDayFormatter = formatter.headerDay;
const dayFormatter = formatter.day;

const Stateful = stateful()(Calendar);

const EVENTS = {
	[new Date(2016, 9, 1)]: [
		{
			type: 'holiday',
			title: 'test'
		}, {
			type: 'birthday',
			title: 'test'
		}
	],
	[new Date(2016, 9, 10)]: [
		{
			type: 'holiday',
			title: 'test'
		}
	]
};

class DayWithEvent extends Day {
	_renderEvents(events) {
		return events.map((event, i) => {
			console.log(css, event.type, css[event.type]);
			return (
				<div key={i} className={`${css.event} ${css[event.type]}`} title={event.title} />
			);
		});
	}
	renderInnerContent() {
		const {
			dayFormatter,
			value,
		} = this.props;
		const events = EVENTS[value];
		return (
			<div>
				{events && (<div className={css.events}>{this._renderEvents(events)}</div>)}
				{dayFormatter ? dayFormatter(value) : value}
			</div>
		);
	}
}

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
					          locale="ru"
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
				<br/>
				<section>
					<Calendar value={this.state.value}
					          firstDayOfWeek={0}
					          onChange={this.onChnage}
					          Day={DayWithEvent}
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