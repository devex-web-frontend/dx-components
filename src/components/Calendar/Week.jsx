import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';

@PURE
export default class Week extends React.Component {
	static propTypes = {
		from: React.PropTypes.instanceOf(moment).isRequired,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	render() {
		const {theme, from} = this.props;
		console.log(from.format('dddd e E'));
		return (
			<div className={theme.week__container}>week</div>
		);
	}
}