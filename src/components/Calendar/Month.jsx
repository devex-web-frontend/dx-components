import React from 'react';
import moment from 'moment';
import {PURE} from 'dx-util/src/react/react';

@PURE
export default class Month extends React.Component {
	static propTypes = {
		value: React.PropTypes.string.isRequired, // ISO - "2016-09-20T15:30:39.298Z"
		month: React.PropTypes.number.isRequired,
		onChange: React.PropTypes.func,
		min: React.PropTypes.string,
		max: React.PropTypes.string
	}

	render() {
		const {value, month} = this.props;

		return (
			<div>{month}</div>
		);
	}
}