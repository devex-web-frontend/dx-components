import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import Day from './Day';
import noop from '../../util/func/noop';
import {isEqualDate, addDays} from '../../util/func/date';

@PURE
export default class Week extends React.Component {
	static propTypes = {
		selectedDate: React.PropTypes.instanceOf(Date),
		dayFormatter: React.PropTypes.func,
		theme: React.PropTypes.shape(CALENDAR_THEME),
		onChange: React.PropTypes.func,
		min: React.PropTypes.instanceOf(Date),
		max: React.PropTypes.instanceOf(Date),
		from: React.PropTypes.instanceOf(Date),
		currentDate: React.PropTypes.instanceOf(Date).isRequired,
		startOfMonth: React.PropTypes.instanceOf(Date).isRequired,
		endOfMonth: React.PropTypes.instanceOf(Date).isRequired,
	}

	static defaultProps = {
		onChange: noop
	}

	render() {
		const {
			theme,
			dayFormatter,
			currentDate,
			onChange,
			selectedDate,
			startOfMonth,
			endOfMonth,
			from
		} = this.props;

		return (
			<div className={theme.week}>
				{Array.from(new Array(7).keys()).map(i => {
					const date = addDays(from, i);
					console.log(date, selectedDate);
					const isSelected = isEqualDate(date, selectedDate);
					const isCurrent = isEqualDate(date, currentDate);
					const isDisabled = date.getTime() < startOfMonth.getTime() ||
						date.getTime() > endOfMonth.getTime();

					return (
						<div className={theme.dayContainer} key={i}>
							<Day value={date}
							     theme={theme}
							     dayFormatter={dayFormatter}
							     isDisabled={isDisabled}
							     isSelected={isSelected}
							     isCurrent={isCurrent}
							     onChange={onChange}/>
						</div>
					);
				})}
			</div>
		);
	}
}