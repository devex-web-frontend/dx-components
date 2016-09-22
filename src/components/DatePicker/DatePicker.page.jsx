import React from 'react';
import DatePicker from './DatePicker';
import {storiesOf} from '@kadira/storybook';
import Demo from '../../demo/Demo.jsx';
import moment from 'moment';
import {DATE_PICKER_FIELD_PROPS} from './Fields/Field.props';
import {PURE} from 'dx-util/src/react/react';

import css from './DatePicker.page.styl';
import iconOpenCalendar from './res/icon-open-calendar.svg';

const darkDemoTheme = {
	container: css.container
};

const CustomLabelField = (props) => {
	const onContextMenu = e => {
		e.preventDefault();
		props.onDateChange(moment().format()); // set current date
	};

	return (
		<span onClick={props.onOpenDatePicker}
			  onContextMenu={onContextMenu}
			  className={props.theme.container}>
			{props.isInvalid ? 'Not selected' : moment(props.value).format(props.dateFormat)}
		</span>
	);
};

CustomLabelField.propTypes = {
	...DATE_PICKER_FIELD_PROPS,
	theme: React.PropTypes.shape({
		container: React.PropTypes.string
	})
};

@PURE
class DatePickerPage extends React.Component {
	state = {
		date: new Date().toISOString()
	}

	customLabelTheme = {
		container: css.customLabelField
	};

	render() {
		return (
			<Demo theme={darkDemoTheme}>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								openCalendarIconName={iconOpenCalendar}/>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								openCalendarIconName={iconOpenCalendar}
								onChange={this.onDateChange}>
						<CustomLabelField theme={this.customLabelTheme}/>
					</DatePicker>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								min={moment().subtract(1, 'days').format()}/>
				</section>
				<section className={css.section}>
					<DatePicker value={this.state.date}
								onChange={this.onDateChange}
								openCalendarIconName={iconOpenCalendar}
								isDisabled={true}/>
				</section>
				<section className={css.section}>
					<DatePicker.Stateful defaultValue={this.state.date}
										 min={moment().subtract(1, 'days').format()}
										 onChange={this.onDateChange}/>
				</section>
			</Demo>
		);
	}

	onDateChange = date => {
		console.log('DatePickerPage : onDateChange', date);
		this.setState({
			date
		});
	}
}

storiesOf('DatePicker', module)
	.add('controlled', () => <DatePickerPage/>);