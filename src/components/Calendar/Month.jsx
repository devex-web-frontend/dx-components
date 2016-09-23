import React from 'react';
import moment from 'moment';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';

@PURE
export default class Month extends React.Component {
	static propTypes = {
		date: React.PropTypes.instanceOf(moment).isRequired,
		onChange: React.PropTypes.func,
		min: React.PropTypes.string,
		max: React.PropTypes.string,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	render() {
		const {date} = this.props;

		return (
			<div>{date.format('MMMM')}</div>
		);
	}
}