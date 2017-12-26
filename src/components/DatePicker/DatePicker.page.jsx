import React from 'react';
import DatePicker from './DatePicker';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import moment from 'moment';
import {DATE_PICKER_FIELD_PROPS} from './fields/field.props';
import {PURE} from 'dx-util/lib/react/react';
import classnames from 'classnames';
import 'moment/locale/ru';
import * as PropTypes from 'prop-types';

import iconOpenCalendar from './resources/icon-open-calendar.svg';
import nextMonthIcon from './resources/icon-move-right.svg';
import previousMonthIcon from './resources/icon-move-left.svg';
import css from './DatePicker.page.styl';

const darkDemoTheme = {
	container: css.container
};

const CustomLabelField = (props) => {
	const onContextMenu = e => {
		e.preventDefault();
		props.onChange(moment().locale(props.locale)); // set current date
	};

	const onClick = e => {
		props.openDatePicker();
	};

	const className = classnames(css.customLabelField, props.theme.field);

	return (
		<span onClick={onClick}
			  onContextMenu={onContextMenu}
			  className={className}>
			{props.isInvalid ? props.placeholder : props.value.format(props.dateFormat)}
		</span>
	);
};

CustomLabelField.propTypes = {
	...DATE_PICKER_FIELD_PROPS,
	theme: PropTypes.shape({
		container: PropTypes.string
	})
};

@PURE
class DatePickerPage extends React.Component {
	state = {
		date: new Date().toISOString()
	}

	render() {
		return (
			<Demo theme={darkDemoTheme}>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								openCalendarIcon={iconOpenCalendar}
								nextMonthIcon={nextMonthIcon}
								previousMonthIcon={previousMonthIcon}/>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								openCalendarIcon={iconOpenCalendar}
								onChange={this.onDateChange}
								placeholder="Not selected"
								nextMonthIcon={nextMonthIcon}
								previousMonthIcon={previousMonthIcon}
								fieldComponent={CustomLabelField}
								fieldDateFormat="MMMM YYYY"
								headerDateFormat="YYYY, MMMM"
								dayFormat="DD"/>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								min={moment().subtract(1, 'days').format()}
								nextMonthIcon={nextMonthIcon}
								previousMonthIcon={previousMonthIcon}
								headerDateFormat="MMMM YYYY"
								fieldDateFormat="DD/MM/YYYY"
								locale="ru"/>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								openCalendarIcon={iconOpenCalendar}
								nextMonthIcon={nextMonthIcon}
								previousMonthIcon={previousMonthIcon}
								isDisabled={true}/>
				</section>
				<section className={css.section}>
					<DatePicker.Stateful defaultValue={new Date().toISOString()}
										 max={moment().add(1, 'months').format()}
										 onChange={this.onDateChange}
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