import React from 'react';
import {PURE} from 'dx-util/src/react/react';
import moment from 'moment';
import {CALENDAR_THEME} from './Calendar.constants';
import range from '../../util/func/range';
import Day from './Day';

@PURE
export default class Week extends React.Component {
	static propTypes = {
		from: React.PropTypes.instanceOf(moment).isRequired,
		dayFormat: React.PropTypes.string.isRequired,
		theme: React.PropTypes.shape(CALENDAR_THEME)
	}

	render() {
		const {theme, from, dayFormat} = this.props;

		return (
			<div className={theme.week}>
				{range(0, 7).map(i => (
					<Day value={from.clone().add(i, 'days')}
						 dayFormat={dayFormat}
						 className={theme.day}
						 theme={theme}
						 key={i}/>
				))}
			</div>
		);
	}
}