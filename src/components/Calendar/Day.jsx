import React from 'react';
import {PURE} from 'dx-util/lib/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';
import Button from '../Button/Button';
import noop from '../../util/func/noop';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

@PURE
export default class Day extends React.Component {
	static propTypes = {
		value: PropTypes.instanceOf(moment).isRequired,
		onChange: PropTypes.func,
		dayFormat: PropTypes.string.isRequired,
		isDisabled: PropTypes.bool,
		isCurrent: PropTypes.bool,
		isSelected: PropTypes.bool,
		theme: PropTypes.shape(CALENDAR_THEME)
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
					onMouseDown={this.onMouseDown}
					isDisabled={isDisabled}
					isFlat={true}
					type="button">
				{value.format(dayFormat)}
			</Button>
		);
	}

	onMouseDown = e => {
		e.preventDefault();
		this.props.onChange(this.props.value.format());
	}
}