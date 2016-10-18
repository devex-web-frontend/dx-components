import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';
import Day from './Day';
import noop from '../../util/func/noop';
import {isDateValid} from '../../util/func/date';

@PURE
export default class Week extends React.Component {
	static propTypes = {
		selectedDate: React.PropTypes.instanceOf(moment).isRequired,
		from: React.PropTypes.instanceOf(moment).isRequired,
		dayFormat: React.PropTypes.string.isRequired,
		min: React.PropTypes.instanceOf(moment).isRequired,
		max: React.PropTypes.instanceOf(moment).isRequired,
		startOfMonth: React.PropTypes.instanceOf(moment).isRequired,
		endOfMonth: React.PropTypes.instanceOf(moment).isRequired,
		currentDate: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func,
		theme: React.PropTypes.shape(CALENDAR_THEME)
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
			selectedDate
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
						<div className={theme.dayContainer} key={i}>
							<Day value={date}
								 onChange={onChange}
								 dayFormat={dayFormat}
								 className={theme.day}
								 isDisabled={!isDateInBounds}
								 isCurrent={isCurrent}
								 isSelected={isSelected}
								 theme={theme} />
						</div>
					);
				})}
			</div>
		);
	}
}