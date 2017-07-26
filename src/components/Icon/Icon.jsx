import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/lib/react/pure';
import * as PropTypes from 'prop-types';

export const ICON = Symbol('Icon');

@PURE
@themr(ICON)
export default class Icon extends React.Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		theme: PropTypes.shape({
			container: PropTypes.string
		})
	}

	render() {
		const {name, theme} = this.props;

		return (
			<svg className={`${theme.container}`}>
				<use xlinkHref={`#${name}`}/>
			</svg>
		);
	}
}