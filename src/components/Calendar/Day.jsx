import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';

@PURE
export default class Day extends React.Component {
	static propTypes = {
		value: React.PropTypes.instanceOf(moment).isRequired,
		dayFormat: React.PropTypes.string.isRequired,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	render() {
		const {theme, value, dayFormat} = this.props;

		return (
			<div className={theme.day}>
				{value.format(dayFormat)}
			</div>
		);
	}
}