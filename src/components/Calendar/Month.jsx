import React from 'react';
import moment from 'moment';
import {PURE} from 'dx-util/src/react/react';
import {CALENDAR_THEME} from './Calendar.constants';
import Week from './Week';
import range from '../../util/func/range';

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
		const {date, theme} = this.props;

		const from = date.startOf('month').startOf('week');

		return (
			<div className={theme.month__container}>
				{range(0, 4).map(week => (
					<Week key={week}
						  from={from.add(week, 'week').clone()}
						  theme={theme}/>
				))}
			</div>
		);
	}
}