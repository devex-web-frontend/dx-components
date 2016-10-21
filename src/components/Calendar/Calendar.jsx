import React from 'react';
import {themr} from 'react-css-themr';
import Month from './Month';
import {PURE} from 'dx-util/src/react/react';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {MEMOIZE} from 'dx-util/src/function/function';
import {CALENDAR_THEME} from './Calendar.constants';
import {cloneDate} from '../../util/func/date';

export const CALENDAR = Symbol('Calendar');

@PURE
@themr(CALENDAR)
export default class Calendar extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(Date),
		min: React.PropTypes.instanceOf(Date),
		max: React.PropTypes.instanceOf(Date),

		/**
		 * Used to change the first day of week.
		 * It varies from Saturday to Monday between different locales.
		 * The allowed range is 0 (Sunday) to 6 (Saturday). The default is 1, Monday, as per ISO 8601.
		 */
		firstDayOfWeek: React.PropTypes.number,
		headerDateFormatter: React.PropTypes.func,
		headerDayFormatter: React.PropTypes.func,
		dayFormatter: React.PropTypes.func,
		headerDayFormat: React.PropTypes.string,
		dayFormat: React.PropTypes.string,
		onChange: React.PropTypes.func,
		previousMonthIcon: React.PropTypes.string,
		nextMonthIcon: React.PropTypes.string,
		theme: React.PropTypes.shape(CALENDAR_THEME),
		Month: React.PropTypes.func,
		Week: React.PropTypes.func,
		Day: React.PropTypes.func
	}

	static defaultProps = {
		Month,
		...Month.defaultProps
	}

	state = {
		displayedDate: this.props.value
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedDate: newProps.value
		});
	}

	render() {
		const {
			theme,
			onChange,
			min,
			max,
			headerDateFormatter,
			headerDayFormatter,
			dayFormatter,
			previousMonthIcon,
			nextMonthIcon,
			Month,
			Week,
			Day,
			firstDayOfWeek
		} = this.props;

		const changeMonthBtnTheme = {
			container: theme.changeMonth__container,
			icon: theme.changeMonth__icon
		};

		const {displayedDate} = this.state;

		return (
			<div className={theme.container}>
				<div className={theme.header}>
					<ButtonIcon name={previousMonthIcon}
					            theme={changeMonthBtnTheme}
					            onClick={this.onChangeMonth(-1)}/>
					<span className={theme.header__text}>
						{headerDateFormatter ? headerDateFormatter(displayedDate) : displayedDate}
					</span>
					<ButtonIcon name={nextMonthIcon}
					            theme={changeMonthBtnTheme}
					            onClick={this.onChangeMonth(1)}/>
				</div>
				{
					<Month selectedDate={cloneDate(displayedDate)}
					       value={this.state.displayedDate}
					       onChange={onChange}
					       min={min}
					       max={max}
					       theme={theme}
					       headerDayFormatter={headerDayFormatter}
					       dayFormatter={dayFormatter}
					       Week={Week}
					       Day={Day}
					       firstDayOfWeek={firstDayOfWeek}/>

				}
			</div>
		);
	}

	@MEMOIZE
	onChangeMonth = step => () => {
		const {displayedDate} = this.state;

		const date = cloneDate(displayedDate);
		date.setMonth(displayedDate.getMonth() + step);

		this.setState({
			displayedDate: date
		});
	}
}