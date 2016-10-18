import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';
import Button from '../Button/Button';
import noop from '../../util/func/noop';
import classnames from 'classnames';

@PURE
export default class Day extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func,
		dayFormat: React.PropTypes.string.isRequired,
		isDisabled: React.PropTypes.bool,
		isCurrent: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	static defaultProps = {
		onChange: noop,
		isDisabled: false,
		isCurrent: false,
		isSelected: false
	}

	render() {
		const {
			theme,
			value,
			dayFormat,
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
				{value.format(dayFormat)}
			</Button>
		);
	}

	onClick = event => {
		event.preventDefault();
		this.props.onChange(this.props.value.format());
	}
}