import React from 'react';
import {themr} from 'react-css-themr';
import {PURE} from 'dx-util/src/react/pure';

export const ICON = Symbol('Icon');

@PURE
@themr(ICON)
export default class Icon extends React.Component {
	static propTypes = {
		name: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func,
		theme: React.PropTypes.shape({
			container: React.PropTypes.string
		})
	}

	render() {
		const {name, theme, onClick} = this.props;

		return (
			<svg className={`${theme.container}`} onClick={onClick}>
				<use xlinkHref={`#${name}`}/>
			</svg>
		);
	}
}