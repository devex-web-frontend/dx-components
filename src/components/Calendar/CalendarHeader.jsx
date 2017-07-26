import React from 'react';
import {PURE} from 'dx-util/lib/react/react';
import moment from 'moment';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import {MEMOIZE} from 'dx-util/lib/function/function';
import {CALENDAR_THEME} from './Calendar.constants';
import * as PropTypes from 'prop-types';

@PURE
export default class CalendarHeader extends React.Component {
	static propTypes = {
		value: PropTypes.instanceOf(moment).isRequired,
		onChange: PropTypes.func,
		locale: PropTypes.string,
		headerDateFormat: PropTypes.string,
		previousMonthIcon: PropTypes.string,
		nextMonthIcon: PropTypes.string,
		theme: PropTypes.shape(CALENDAR_THEME),
	}

	render() {
		const {
			theme,
			value,
			headerDateFormat,
			previousMonthIcon,
			nextMonthIcon,
		} = this.props;

		const changeMonthBtnTheme = {
			container: theme.changeMonth__container,
			icon: theme.changeMonth__icon
		};

		const headerDate = value.format(headerDateFormat);
		return (
			<div className={theme.header}>
				<ButtonIcon name={previousMonthIcon} theme={changeMonthBtnTheme} onClick={this.onChangeMonth(-1)}/>
				<span className={theme.header__text}>{headerDate}</span>
				<ButtonIcon name={nextMonthIcon} theme={changeMonthBtnTheme} onClick={this.onChangeMonth(1)}/>
			</div>
		);
	}

	@MEMOIZE
	onChangeMonth = step => () => {
		const {value, onChange} = this.props;
		onChange && onChange(value.clone().add(step, 'months'));
	}
}

