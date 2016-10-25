import React from 'react';
import DatePicker from './DatePicker';
import Checkbox from '../Checkbox/Checkbox';
import checkboxIcon from '../Checkbox/img/icon-checkbox-tick.svg';
import moment from 'moment';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import {DATE_PICKER_FIELD_PROPS} from './fields/field.props';
import {PURE} from 'dx-util/src/react/react';
import classnames from 'classnames';
import {cloneDate, addMonths} from '../../util/func/date';

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
		props.onChange(now);
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

export const FORMATTER = {
	INTL: {
		headerDate: (date, locale) => {
			return new Intl.DateTimeFormat(locale, {
				month: 'short',
				year: 'numeric'
			}).format(date);
		},
		headerDay: (date, locale) => {
			return new Intl.DateTimeFormat(locale, {
				weekday: 'short'
			}).format(date);
		},
		day: (date, locale) => {
			return new Intl.DateTimeFormat(locale, {
				day: 'numeric'
			}).format(date);
		},
		date: (date, locale) => {
			return new Intl.DateTimeFormat(locale).format(date);
		}
	},
	MOMENT: {
		headerDate: (date) => {
			const newDate = moment(date);
			return newDate.format('MMM YYYY');
		},
		headerDay: (date) => {
			const newDate = moment(date);
			return moment.weekdays(newDate.day());
		},
		day: (date) => {
			const newDate = moment(date);
			return newDate.format('D');
		},
		date: (date) => {
			const newDate = moment(date);
			return newDate.format('MM/DD/YY');
		}
	}
};

const DemoDatePicker = (props) => {
	const {useMomentFormatter} = props;
	const {headerDate, headerDay, day, date} = useMomentFormatter ? FORMATTER.MOMENT : FORMATTER.INTL;
	return (
		<DatePicker {...props}
		            headerDateFormatter={headerDate}
		            headerDayFormatter={headerDay}
		            dayFormatter={day}
		            dateFormatter={date}/>
	);
};

DemoDatePicker.propTypes = {
	...DatePicker.propTypes,
	useMomentFormatter: React.PropTypes.bool
};

DemoDatePicker.defaultProps = {
	useMomentFormatter: false,
	openCalendarIcon: iconOpenCalendar,
	nextMonthIcon,
	previousMonthIcon
};

const Stateful = stateful()(DemoDatePicker);

Stateful.defaultProps = DemoDatePicker.defaultProps;

@PURE
class DatePickerPage extends React.Component {
	state = {
		useMomentFormatter: false,
		date: new Date()
	}

	render() {
		const {useMomentFormatter, date} = this.state;

		return (
			<Demo theme={darkDemoTheme}>

				<label htmlFor="check1" className={css.checkboxLabel}>
					<Checkbox checkboxIconName={checkboxIcon}
					          isChecked={useMomentFormatter}
					          useMomentFormatter={useMomentFormatter}
					          onChange={this.onChangeCheckbox}
					          id="check1"/>
					Use moment formatter
				</label>

				<section className={css.section}>
					<DemoDatePicker value={date}
					                useMomentFormatter={useMomentFormatter}
					                onChange={this.onDateChange}/>
				</section>
				<section className={css.section}>
					<DemoDatePicker value={date}
					                useMomentFormatter={useMomentFormatter}
					                onChange={this.onDateChange}
					                Input={CustomLabelField}/>
				</section>
				<section className={css.section}>
					<DemoDatePicker value={date}
					                useMomentFormatter={useMomentFormatter}
					                onChange={this.onDateChange}
					                locale="ru"
					                min={minDemo}/>
				</section>
				<section className={css.section}>
					<DemoDatePicker value={date}
					                useMomentFormatter={useMomentFormatter}
					                onChange={this.onDateChange}
					                isDisabled={true}/>
				</section>
				<section className={css.section}>
					<Stateful defaultValue={now}
					          useMomentFormatter={useMomentFormatter}
					          max={maxDemo}
					          onChange={this.onDateChange}/>
				</section>
			</Demo>
		);
	}

	onChangeCheckbox = (e) => {
		this.setState({
			useMomentFormatter: !this.state.useMomentFormatter
		});
	}

	onDateChange = date => {
		let newDate = Date.parse(date);
		if (isNaN(newDate)) {
			newDate = now;
		} else {
			newDate = new Date(newDate);
		}
		this.setState({
			date: newDate
		});
	}
}

storiesOf('DatePicker', module)
	.add('controlled', () => <DatePickerPage/>);