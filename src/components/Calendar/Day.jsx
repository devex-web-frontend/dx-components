import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';
import noop from '../../util/func/noop';
import classnames from 'classnames';

@PURE
export default class Day extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func,
		dayFormat: React.PropTypes.string.isRequired,
		disabled: React.PropTypes.bool,
		isCurrent: React.PropTypes.bool,
		selected: React.PropTypes.bool,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	static defaultProps = {
		onChange: noop,
		disabled: false,
		isCurrent: false,
		selected: false
	}

	render() {
		const {
			theme,
			value,
			dayFormat,
			isCurrent,
			disabled,
			selected
		} = this.props;

		const className = classnames(theme.day, {
			[theme.day_disabled]: disabled,
			[theme.day_current]: isCurrent,
			[theme.day_selected]: selected && !disabled
		});

		return (
			<div className={className}
				 onClick={this.onDayClick}>
				{value.format(dayFormat)}
			</div>
		);
	}

	onDayClick = e => {
		if (!this.props.disabled) {
			this.props.onChange(this.props.value.format());
		}
	}
}