import React from 'react';
import moment from 'moment';
import {PURE} from 'dx-util/lib/react/pure';
import Demo from '../../demo/Demo.jsx';
import Day from './Day';
import {FORMATTER} from '../DatePicker/DatePicker.page';
import Calendar from './Calendar.jsx';
import {storiesOf} from '@kadira/storybook';

import nextMonthIcon from '../DatePicker/resources/icon-move-right.svg';
import previousMonthIcon from '../DatePicker/resources/icon-move-left.svg';
import css from './Calendar.page.styl';

class CustomDay extends React.Component {
	static propTypes = Day.propTypes
	render() {
		const {theme, value, dayFormat} = this.props;
		const day = Number(value.format('D'));
		const hasEvent = [10, 20].indexOf(day) !== -1;
		return (
			<div className={theme.day}>
				{value.format(dayFormat)}
				{hasEvent && <small className={css.event} /> }
			</div>
		);
	}
}

const calendarTheme = {
	day: css.day
};

const dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

@PURE
class CalendarPage extends React.Component {

	state = {
		value: new Date().toISOString()
	}

	render() {
		const {value, displayedDate} = this.state;
		return (
			<Demo>
				<section>
					displayedDate: {displayedDate ? displayedDate.format(dateFormat) : moment(value).format(dateFormat)}
				</section>
				<section>
					<Calendar value={value}
					          previousMonthIcon={previousMonthIcon}
					          onChange={this.onChange}
					          onChangeDisplayed={this.onChangeDisplayed}
					          nextMonthIcon={nextMonthIcon} />
				</section>

				<section>
					<Calendar value={value}
					          theme={calendarTheme}
					          previousMonthIcon={previousMonthIcon}
					          onChange={this.onChange}
					          Day={CustomDay}
					          nextMonthIcon={nextMonthIcon} />
				</section>
			</Demo>
		);
	}

	onChangeDisplayed = displayedDate => {
		this.setState({
			displayedDate
		});
	}

	onChange = value => {
		this.setState({
			value
		});
	}
}

storiesOf('Calendar', module).add('Default', () => <CalendarPage />);