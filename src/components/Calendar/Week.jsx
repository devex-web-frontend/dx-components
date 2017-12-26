import React from 'react';
import {PURE} from 'dx-util/lib/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';
import Day from './Day';
import noop from '../../util/func/noop';
import {isDateValid} from '../../util/func/date';
import * as PropTypes from 'prop-types';

@PURE
export default class Week extends React.Component {
	static propTypes = {
		selectedDate: PropTypes.instanceOf(moment).isRequired,
		from: PropTypes.instanceOf(moment).isRequired,
		dayFormat: PropTypes.string.isRequired,
		min: PropTypes.instanceOf(moment).isRequired,
		max: PropTypes.instanceOf(moment).isRequired,
		startOfMonth: PropTypes.instanceOf(moment).isRequired,
		endOfMonth: PropTypes.instanceOf(moment).isRequired,
		currentDate: PropTypes.instanceOf(moment).isRequired,
		onChange: PropTypes.func,
		theme: PropTypes.shape(CALENDAR_THEME),
		Day: PropTypes.func,
	}

	static defaultProps = {
		onChange: noop
	}

	render() {
		const {
			theme,
			from,
			dayFormat,
			onChange,
			min,
			max,
			startOfMonth,
			endOfMonth,
			currentDate,
			selectedDate,
			Day
		} = this.props;

		return (
			<div className={theme.week}>
				{Array.from(new Array(7).keys()).map(i => {
					const date = from.clone().add(i, 'days');

					const isDateInBounds = isDateValid(date, startOfMonth, endOfMonth) &&
						isDateValid(date, min, max);
					const isCurrent = date.isSame(currentDate, 'day');
					const isSelected = date.isSame(selectedDate, 'day');

					return (
						<Day value={date}
							 onChange={onChange}
							 dayFormat={dayFormat}
							 className={theme.day}
							 isDisabled={!isDateInBounds}
							 isCurrent={isCurrent}
							 isSelected={isSelected}
							 theme={theme}
							 key={i}/>
					);
				})}
			</div>
		);
	}
}