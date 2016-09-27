import React from 'react';
import {themr} from 'react-css-themr';
import moment from 'moment';
import Month from './Month';
import {PURE} from 'dx-util/src/react/react';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {MEMOIZE} from 'dx-util/src/function/function';
import {CALENDAR_THEME} from './Calendar.constants';
import noop from '../../util/func/noop';

export const CALENDAR = Symbol('Calendar');

@PURE
@themr(CALENDAR)
export default class Calendar extends React.Component {
	static propTypes = {
		value: React.PropTypes.string.isRequired, // ISO - "2016-09-20T15:30:39.298Z"
		headerDateFormat: React.PropTypes.string.isRequired,
		headerDayFormat: React.PropTypes.string.isRequired,
		dayFormat: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func,
		min: React.PropTypes.string, // ISO
		max: React.PropTypes.string, // ISO
		previousMonthIcon: React.PropTypes.string,
		nextMonthIcon: React.PropTypes.string,
		locale: React.PropTypes.string.isRequired,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	static defaultProps = {
		onChange: noop,
		min: null,
		max: null
	}

	state = {
		displayedDate: moment(this.props.value)
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			displayedDate: moment(newProps.value)
		});
	}

	render() {
		const {
			theme,
			onChange,
			min,
			max,
			headerDateFormat,
			headerDayFormat,
			dayFormat,
			previousMonthIcon,
			nextMonthIcon,
			locale,
			value
		} = this.props;

		const displayedDate = this.state.displayedDate.locale(locale);
		const headerDate = displayedDate.format(headerDateFormat);

		const changeMonthBtnTheme = {
			container: theme.changeMonth__container,
			icon: theme.changeMonth__icon
		};

		return (
			<div className={theme.container}>
				<div className={theme.header}>
					<ButtonIcon name={previousMonthIcon}
								theme={changeMonthBtnTheme}
								onClick={this.onChangeMonth(-1)}/>
					<span className={theme.header__text}>{headerDate}</span>
					<ButtonIcon name={nextMonthIcon}
								theme={changeMonthBtnTheme}
								onClick={this.onChangeMonth(1)}/>
				</div>
				<Month selectedDate={moment(value).locale(locale)}
					   onChange={onChange}
					   startOfMonth={displayedDate.clone().startOf('month')}
					   endOfMonth={displayedDate.clone().endOf('month')}
					   currentDate={moment().locale(locale)}
					   min={moment(min).locale(locale)}
					   max={moment(max).locale(locale)}
					   theme={theme}
					   headerDayFormat={headerDayFormat}
					   dayFormat={dayFormat}/>
			</div>
		);
	}

	@MEMOIZE
	onChangeMonth = step => () => {
		this.setState({
			displayedDate: this.state.displayedDate.clone().add(step, 'months')
		});
	}
}