import React from 'react';
import * as PropTypes from 'prop-types';
import {themr} from 'react-css-themr';
import split from 'dx-util/lib/string/split';
import {PURE} from 'dx-util/lib/react/pure';

export const HIGHLIGHT = Symbol('Mark');

export const HIGHLIGHT_THEME_SHAPE = {
	container: PropTypes.string,
	mark: PropTypes.string
};

@PURE
@themr(HIGHLIGHT)
export default class Highlight extends React.Component {
	static propTypes = {
		search: PropTypes.string,
		children: PropTypes.string,
		theme: PropTypes.shape(HIGHLIGHT_THEME_SHAPE)
	};

	static defaultProps = {
		children: '',
		search: ''
	};

	render() {
		const {search, children, theme} = this.props;

		let result;
		if (this.props.search === '') {
			result = children;
		} else {
			const splitted = split(children, search, false);
			result = splitted.reduce((acc, el, i) => {
				if (el.trim() !== '') {
					acc.push(i % 2 ? <mark className={theme.mark} key={i}>{el}</mark> : el);
				}
				return acc;
			}, []);
		}

		return (
			<span className={theme.container}>
				{result}
			</span>
		);
	}
}