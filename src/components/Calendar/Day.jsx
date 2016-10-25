import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import Button from '../Button/Button';
import classnames from 'classnames';

@PURE
export default class Day extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(Date).isRequired,
		onChange: React.PropTypes.func,
		dayFormatter: React.PropTypes.func,
		isDisabled: React.PropTypes.bool,
		isCurrent: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	render() {
		const {
			theme,
			dayFormatter,
			value,

			isCurrent,
			isDisabled,
			isSelected
		} = this.props;

		const btnTheme = {
			container: classnames(theme.day, {
				[theme.day_disabled]: isDisabled,
				[theme.day_current]: isCurrent && !isDisabled,
				[theme.day_selected]: isSelected && !isDisabled
			})
		};

		return (
			<Button theme={btnTheme}
			        onClick={this.onClick}
			        isDisabled={isDisabled}
			        isFlat={true}
			        type="button">
				{dayFormatter ? dayFormatter(value) : value}
			</Button>
		);
	}

	onClick = () => {
		event.preventDefault();
		const {onChange, value} = this.props;
		onChange && onChange(value);
	}
}