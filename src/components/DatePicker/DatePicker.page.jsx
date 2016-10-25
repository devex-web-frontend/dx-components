import React from 'react';
import DatePicker from './DatePicker';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import moment from 'moment';
import {DATE_PICKER_FIELD_PROPS} from './fields/field.props';
import {PURE} from 'dx-util/src/react/react';
import classnames from 'classnames';
import {cloneDate, addMonths} from '../../util/func/date';
import 'moment/locale/ru';

import iconOpenCalendar from './resources/icon-open-calendar.svg';
import nextMonthIcon from './resources/icon-move-right.svg';
import previousMonthIcon from './resources/icon-move-left.svg';
import css from './DatePicker.page.styl';
import stateful from '../../util/react/stateful';
const darkDemoTheme = {
	container: css.container
};

const now = new Date();
const minDemo = cloneDate(now);
addMonths(minDemo, -1);
const maxDemo = cloneDate(now);
addMonths(maxDemo, 1);

const CustomLabelField = (props) => {
	const onContextMenu = e => {
		e.preventDefault();
		props.onChange(moment().locale(props.locale)); // set current date
	};

	const className = classnames(css.customLabelField, props.theme.field);

	const {dateFormatter, value} = props;

	return (
		<span onClick={props.onClick} onContextMenu={onContextMenu}
			  className={className}>
			{dateFormatter ? dateFormatter(value) : value}
		</span>
	);
};

CustomLabelField.propTypes = {
	...DATE_PICKER_FIELD_PROPS,
	theme: React.PropTypes.shape({
		container: React.PropTypes.string
	})
};

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

const dateFormatter = (date) => {
	return new Intl.DateTimeFormat(locale).format(date);
};

const Stateful = stateful()(DatePicker);

@PURE
class DatePickerPage extends React.Component {
	state = {
		date: new Date()
	}

	render() {
		return (
			<Demo theme={darkDemoTheme}>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								openCalendarIcon={iconOpenCalendar}
								nextMonthIcon={nextMonthIcon}
								headerDateFormatter={headerDateFormatter}
								headerDayFormatter={headerDayFormatter}
								dayFormatter={dayFormatter}
								dateFormatter={dateFormatter}
								previousMonthIcon={previousMonthIcon}/>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								openCalendarIcon={iconOpenCalendar}
								onChange={this.onDateChange}
								placeholder="Not selected"
								nextMonthIcon={nextMonthIcon}
								previousMonthIcon={previousMonthIcon}
								Input={CustomLabelField}
								headerDateFormatter={headerDateFormatter}
								headerDayFormatter={headerDayFormatter}
								dayFormatter={dayFormatter}
								dateFormatter={dateFormatter} />
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								min={minDemo}
								nextMonthIcon={nextMonthIcon}
								previousMonthIcon={previousMonthIcon}
								headerDateFormatter={headerDateFormatter}
								headerDayFormatter={headerDayFormatter}
								dayFormatter={dayFormatter}
								dateFormatter={dateFormatter}
								locale="ru" />
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								openCalendarIcon={iconOpenCalendar}
								nextMonthIcon={nextMonthIcon}
								headerDateFormatter={headerDateFormatter}
								headerDayFormatter={headerDayFormatter}
								dayFormatter={dayFormatter}
								dateFormatter={dateFormatter}
								previousMonthIcon={previousMonthIcon}
								isDisabled={true}/>
				</section>
				<section className={css.section}>
					<Stateful defaultValue={now}
										 max={maxDemo}
										 onChange={this.onDateChange}
										 headerDateFormatter={headerDateFormatter}
										 headerDayFormatter={headerDayFormatter}
										 dayFormatter={dayFormatter}
										 dateFormatter={dateFormatter}
										 nextMonthIcon={nextMonthIcon}
										 previousMonthIcon={previousMonthIcon}/>
				</section>
			</Demo>
		);
	}

	onDateChange = date => {
		this.setState({
			date
		});
	}
}

storiesOf('DatePicker', module)
	.add('controlled', () => <DatePickerPage/>);