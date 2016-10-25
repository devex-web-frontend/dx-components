import React from 'react';
import {themr} from 'react-css-themr';
import Month from './Month';
import {PURE} from 'dx-util/src/react/react';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {MEMOIZE} from 'dx-util/src/function/function';
import {CALENDAR_THEME} from './Calendar.constants';
import {addMonths} from '../../util/func/date';

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
		locale: React.PropTypes.string,
		Month: React.PropTypes.func,
		CalendarHeader: React.PropTypes.func,
		Day: React.PropTypes.func
	}

	static defaultProps = {
		Month,
		CalendarHeader,
		locale: 'en',
		...Month.defaultProps
	}

	state = {
		displayedDate: this.props.value
	}

	render() {
		const {
			theme,
			onChange,
			min,
			locale,
			max,
			previousMonthIcon,
			nextMonthIcon,
			Month,
			Day,
			value,
			firstDayOfWeek,
			headerDateFormatter: originalHeaderDateFormatter,
			headerDayFormatter: originalHeaderDayFormatter,
			dayFormatter: originalDayFormatter
		} = this.props;

		const headerDayFormatter = value => {
			return originalHeaderDayFormatter(value, locale);
		};

		const dayFormatter = value => {
			return originalDayFormatter(value, locale);
		};

		const headerDateFormatter = value => {
			return originalHeaderDateFormatter(value, locale);
		};

		const {displayedDate} = this.state;

		return (
			<div className={theme.container}>
				<CalendarHeader theme={theme}
				                value={displayedDate}
				                headerDateFormatter={headerDateFormatter}
				                previousMonthIcon={previousMonthIcon} nextMonthIcon={nextMonthIcon}
				                onChange={this.onChangeDisplayedDate}/>
				{
					<Month selectedDate={value}
					       displayedDate={displayedDate}
					       onChange={onChange}
					       min={min}
					       max={max}
					       theme={theme}
					       headerDayFormatter={headerDayFormatter}
					       dayFormatter={dayFormatter}
					       Day={Day}
					       firstDayOfWeek={firstDayOfWeek}/>

				}
			</div>
		);
	}

	onChangeDisplayedDate = displayedDate => {
		this.setState({
			displayedDate
		});
	}
}

class CalendarHeader extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(Date),
		onChange: React.PropTypes.func,
		locale: React.PropTypes.string,
		headerDateFormatter: React.PropTypes.func,
		previousMonthIcon: React.PropTypes.string,
		nextMonthIcon: React.PropTypes.string,
		theme: React.PropTypes.shape(CALENDAR_THEME),
	}

	render() {
		const {
			theme,
			value,
			headerDateFormatter,
			previousMonthIcon,
			nextMonthIcon,
		} = this.props;

		const changeMonthBtnTheme = {
			container: theme.changeMonth__container,
			icon: theme.changeMonth__icon
		};

		return (
			<div className={theme.header}>
				<ButtonIcon name={previousMonthIcon} theme={changeMonthBtnTheme} onClick={this.onChangeMonth(-1)}/>
				<span className={theme.header__text}>
					{headerDateFormatter ? headerDateFormatter(value) : value}
				</span>
				<ButtonIcon name={nextMonthIcon} theme={changeMonthBtnTheme} onClick={this.onChangeMonth(1)}/>
			</div>
		);
	}

	@MEMOIZE
	onChangeMonth = step => () => {
		const {value, onChange} = this.props;
		const newValue = addMonths(value, step);
		onChange && onChange(newValue);
	}
}